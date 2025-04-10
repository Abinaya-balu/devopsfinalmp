const Hall = require('../model/hallSchema');
const User = require("../model/userSchema");

const createHall = async (req, res, next) => {
  try {
    const { name, capacity, amenities, description, price, hallCreater } = req.body;

    if (!name || !capacity || !amenities || !description || !price || !hallCreater) {
      return res.status(422).json({ error: "Please fill all details" });
    }

    if (capacity <= 0) {
      return res.status(422).json({ error: "Please enter a valid capacity greater than zero" });
    }

    const hall = new Hall({ name, capacity, amenities, description, price, hallCreater });
    await hall.save();
    res.status(201).json({ message: 'Slot created successfully' });
  } catch (error) {
    next(error);
  }
};

const getHalls = async (req, res, next) => {
  try {
    const halls = await Hall.find();
    res.json({ halls });
  } catch (error) {
    next(error);
  }
};

const getHallById = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json({ hall });
  } catch (error) {
    next(error);
  }
};

const updateHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const { name, capacity, amenities, description, price } = req.body;
    const currentUserMail = req.rootUser.email;
    const masterAdminMail = process.env.REACT_APP_MASTER_ADMIN_EMAIL;
    const hall = await Hall.findById(hallId);

    if (!hall) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (hall.hallCreater !== currentUserMail && currentUserMail !== masterAdminMail) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedHall = await Hall.findByIdAndUpdate(
      hallId,
      { name, capacity, amenities, description, price },
      { new: true }
    );

    if (!updatedHall) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.json({ hall: updatedHall });
  } catch (error) {
    next(error);
  }
};

const deleteHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findByIdAndDelete(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createHall, getHalls, getHallById, updateHall, deleteHall };
