const Board = require("../models/boardModel");
const AppError = require("../utils/errorHandling/AppError");
const { validateCreateBoardBody,
    validateUpdateBoardBody
} = require("../validate/validateBoard");
const {
    BOARD_CREATED_SUCCESSFULLY,
    BOARD_UPDATED_SUCCESSFULLY
} = require("../constants//boardConstants");

exports.createInstitute = async (req, res, next) => {
    const value = await validateCreateBoardBody(req.body);
    if (!value.status) {
        return next(new AppError(400, value.message));

    }
    const { board_name } = req.body;
    const boardBody = {
        board_name,
        created_by: req.user._id,
    };
    try {
        const newBoard = await Institute.create(boardBody);
        res.status(201).json({
            status: "success",
            data: {
                message: BOARD_CREATED_SUCCESSFULLY,
                institute: newBoard,
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.updateBoard = async (req, res, next) => {
    const value = await validateUpdateBoardBody(req.body);
    if (!value.status) {
        return next(new AppError(400, value.message));

    }
    const { board_name, _id } = req.body;
    const boardBody = {
        board_name,
        created_by: req.user._id,
    };
    try {
        const updatedBoard = await Institute.findByIdAndUpdate(_id, boardBody, { new: true });
        res.status(201).json({
            status: "success",
            data: {
                message: BOARD_UPDATED_SUCCESSFULLY,
                institute: updatedBoard,
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getBoard = async (req, res, next) => {
    try {
        const board = await Board.find();
        res.status(200).json({
            status: "success",
            data: {
                board
            }
        })
    } catch (error) {
        console.log(error)
    }
}
