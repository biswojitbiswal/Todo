import { AsyncHandller } from "../utils/AsyncHandller.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/cloudinary.utils.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    return res.status(500).json({
      message:
        "Something went wrong while generating access and refresh token!",
    });
  }
};

const registerUser = AsyncHandller(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields require" });
    }

    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      return res.status(409).json({ message: "Username or Email already exists" });
    }

    const avatarImageLocalPath = req.files?.avatar[0]?.path;

    if (!avatarImageLocalPath) {
      return res.status(400).json({ message: "Avatar file required" });
    }

    const avatarImage = await uploadCloudinary(avatarImageLocalPath);

    if (!avatarImage) {
      return res.status(400).json({ message: "Avatar file required" });
    }

    const user = await User.create({
      username,
      email,
      password,
      avatar: avatarImage.url,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering user" });
    }

    // console.log(createdUser)
    const { accessToken } = await generateAccessAndRefreshToken(
      createdUser._id
    );

    return res.status(200).json({
      message: "User registered successfully",
      user: createdUser,
      userId: createdUser._id.toString(),
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal backend error", error });
  }
});

const loginUser = AsyncHandller(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user authentication" });
    }

    const { accessToken } = await generateAccessAndRefreshToken(user._id);

    const loginUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      user: loginUser,
      message: "User login successfully",
      userId: loginUser._id,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const signWithGoogle = AsyncHandller(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const { accessToken } = await generateAccessAndRefreshToken(user._id);
      // const {password : hashedPassword, ...rest } = user._doc;
      const loginUser = await User.findById(user._id).select("-password");

      return res.status(200).json({
        user: loginUser,
        message: "User Login Successfully",
        userId: loginUser._id,
        token: accessToken,
      });

    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

      // console.log(req.body.avatar)

    const avatarImage = await uploadCloudinary(req.body.avatar);

    if (!avatarImage) {
      return res.status(400).json({ message: "Avatar file required" });
    }

      const newUser = await User.create({
        username: req.body.username.split(" ")[0],
        email: req.body.email,
        password: generatedPassword,
        avatar: avatarImage.url,
      });

      const createdUser = await User.findById(newUser._id).select("-password");

      if (!createdUser) {
        return res
          .status(500)
          .json({ message: "Something went wrong while registering user" });
      }

      const { accessToken } = await generateAccessAndRefreshToken(
        createdUser._id
      );



      return res.status(200).json({
        message: "User Registered Successfully",
        user: createdUser,
        userId: createdUser._id.toString(),
        token: accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal backend error", error });
  }
});

const getCurrUser = AsyncHandller(async (req, res) => {
  const userData = req.user;

  if (!userData) {
    return res.status(404).json({ message: "Something went wrong" });
  }

  return res.status(200).json({
    userData,
    message: "User Fetched Succesfully",
  });
});

const editUserName = AsyncHandller(async (req, res) => {
  try {
    const id = req.params.id;
    const newUserName = req.body.username;

    const updateUser = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          username: newUserName,
        },
      },
      { new: true }
    ).select("-password");

    if (!updateUser) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ message: "Username updated", updateUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Somethong Wrong" });
  }
});

const passwordReset = AsyncHandller(async (req, res) => {
  try {
    const { opassword, cpassword } = req.body;

    if (opassword === cpassword) {
      return res.status(401).json({ message: "New password must not be same" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await user.isPasswordCorrect(opassword);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    user.password = cpassword;
    await user.save({ validateBeforeSave: false });

    const upadatedUser = await User.findById({ _id: user._id }).select(
      "-password"
    );

    return res.status(200).json({ message: "Password changed", upadatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internale server error" });
  }
});

const deleteUser = AsyncHandller(async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassMatch = await user.isPasswordCorrect(password);

    if (!isPassMatch) {
      return res.status(401).json({ message: "Invalid user authentication" });
    }

    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({ message: "User Deleted", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export {
  registerUser,
  loginUser,
  signWithGoogle,
  getCurrUser,
  editUserName,
  passwordReset,
  deleteUser,
};
