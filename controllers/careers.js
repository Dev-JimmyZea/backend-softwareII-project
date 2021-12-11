'use strict';

const express = require('express');
const router = express.Router();
const Career = require('../models/career');

module.exports = {
    getCareers: async (req, res) => {
        try {
            const careers = await Career.find();
            return res.status(200).json({
                message: 'Careers fetched successfully',
                users: careers
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch careers',
                error: err
            });
        }
    },
    getCareer: async (req, res) => {
        try {
            const career = await Career.findById(req.params.id);
            return res.status(200).json({
                message: 'Career fetched successfully',
                career: career
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch career',
                error: err
            });
        }
    },
    createCareer: async (req, res) => {
        try {
            const career = await Career.create(req.body);
            return res.status(201).json({
                message: 'Career created successfully',
                career: career
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create career',
                error: err
            });
        }
    },
    updateCareer: async (req, res) => {
        try {
            const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            return res.status(200).json({
                message: 'Career updated successfully',
                career: career
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update career',
                error: err
            });
        }
    },

    deleteCareer: async (req, res) => {
        try {
            const career = await Career.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message: 'Career deleted successfully',
                career: career
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete career',
                error: err
            });
        }
    }
    
};

