import { ERROR, SUCCESS } from "../config/statusText.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Friend from "../models/friendsModel.js";
import User from "../models/UserModel.js";

export const getFriends = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const friendsList = await Friend.find({
    friends: { $in: [userId] },
    relation: "accepted",
  })
    .populate("friends", "fullName avatar _id")
    .select("-__v -relation");

  if (friendsList.length === 0) {
    return res.status(200).json({
      status: SUCCESS,
      message: "No friends found",
      friends: [],
    });
  }

  const friends = friendsList.flatMap((friend) =>
    friend.friends.filter(
      (f) => f._id.toString() !== userId.toString()
    )
  );

  return res.status(200).json({
    status: SUCCESS,
    message: "Friends fetched successfully",
    friends,
  });
});


export const addFriend = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.body;

  if (userId.toString() === friendId.toString()) {
    return res.status(400).json({
      status: ERROR,
      message: "You cannot add yourself as a friend",
    });
  }

  const existingFriend = await Friend.findOne({
    friends: { $all: [userId, friendId] },
  });

  if (existingFriend) {
    return res.status(400).json({
      status: ERROR,
      message: "Friend already added or pending",
    });
  }

  const friendRequest = await Friend.create({
    friends: [userId, friendId],
    relation: "pending",
  });

  return res.status(201).json({
    status: SUCCESS,
    message: "Friend request sent successfully",
    data: {
      friendRequest: {
        id: friendRequest._id,
        relation: friendRequest.relation,
        sentTo: friendId,
      },
    },
  });
});

export const acceptFriend = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.body;

  const friendRequest = await Friend.findOne({
    friends: { $all: [userId, friendId] },
  });

  if (!friendRequest) {
    return res
      .status(400)
      .json({ status: ERROR, message: "Friend request not found" });
  }

  // Update relation status
  friendRequest.relation = "accepted";
  await friendRequest.save();

  // Update users' friend lists without duplication
  await Promise.all([
    User.updateOne(
      { _id: userId, friends: { $ne: friendId } },
      { $push: { friends: friendId } }
    ),
    User.updateOne(
      { _id: friendId, friends: { $ne: userId } },
      { $push: { friends: userId } }
    ),
  ]);

  return res.status(200).json({
    status: SUCCESS,
    message: "Friend request accepted",
    data: {
      friendRequestId: friendRequest._id,
      relation: friendRequest.relation,
    },
  });
});


export const rejectFriend = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.body;

  const friendRequest = await Friend.findOne({
    friends: { $all: [userId, friendId] },
  });

  if (!friendRequest) {
    return res.status(404).json({
      status: ERROR,
      message: "Friend request not found",
    });
  }

  await friendRequest.deleteOne();

  return res.status(200).json({
    status: SUCCESS,
    message: "Friend request rejected successfully",
  });
});


export const getAllUsers = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const users = await User.find({ _id: { $ne: userId } }).select(
    "fullName email avatar"
  );

  return res.status(200).json({ status: SUCCESS, users });
});

export const getFriendRequests = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const requests = await Friend.find({
    friends: { $in: [userId] },
    relation: "pending",
  })
    .populate("friends", "fullName avatar _id")
    .select("-__v -relation");

  const filteredRequests = requests.map((request) => {
    const friend = request.friends.find(
      (f) => f._id.toString() !== userId.toString()
    );

    return {
      _id: friend?._id,
      fullName: friend?.fullName,
      avatar: friend?.avatar,
    };
  });

  return res.status(200).json({
    status: SUCCESS,
    requests: filteredRequests,
  });
});

export const removeFriend = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.params;

  const friendRelation = await Friend.findOne({
    friends: { $all: [userId, friendId] },
    relation: "accepted",
  });

  if (!friendRelation) {
    return res.status(404).json({
      status: ERROR,
      message: "Friend relationship not found",
    });
  }

  await friendRelation.deleteOne();

  const user = await User.findById(userId);
  const friendUser = await User.findById(friendId);

  if (user?.friends?.includes(friendId)) {
    user.friends = user.friends.filter(
      (id) => id.toString() !== friendId.toString()
    );
    await user.save();
  }

  if (friendUser?.friends?.includes(userId)) {
    friendUser.friends = friendUser.friends.filter(
      (id) => id.toString() !== userId.toString()
    );
    await friendUser.save();
  }

  return res.status(200).json({
    status: SUCCESS,
    message: "Friend removed successfully",
  });
});
