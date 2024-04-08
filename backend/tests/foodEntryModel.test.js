const mockingoose = require('mockingoose');
const mongoose = require("mongoose")
const {FoodItem} = require("../models/foodItemModel");
const {FoodEntry, deleteFoodEntry, createFoodEntryData, getFoodEntryData} = require("../models/foodEntryModel")

describe('FoodEntry Functions', () => {
    describe('delete Food Entry', () => {
      it ('should return 204 on success', async () => {
        mockingoose(FoodEntry).toReturn({}, 'findByIdAndDelete');
        const results = await deleteFoodEntry(1);
        expect(results.status).toBe(204);
      });
    });

    describe('create Food Entry', () => {
        it ('should return 201 and the entry on success', async () => {
            testfoodentry = {date : new Date("12-31-2020"), parts : ['4edd40c86762e0fb12000003'], name : "food entry test", userId : "abc"}
            mockingoose(FoodEntry).toReturn(testfoodentry, 'save');
            const results = await createFoodEntryData("12-31-2020", "food entry test", [new mongoose.Types.ObjectId('4edd40c86762e0fb12000003')], "abc");
            expect(results.status).toBe(201);
            const actualResult = JSON.parse(JSON.stringify(results.json));
            delete actualResult._id;
            expect(actualResult).toEqual(JSON.parse(JSON.stringify(testfoodentry)))
          });
    })

    describe('find Food Entry', () => {
        it ('should return 200 and the entry on success', async () => {
            testfoodentry = {date : new Date("12-31-2020"), parts : ['4edd40c86762e0fb12000003'], name : "food entry test", userId : "abc"}
            mockingoose(FoodEntry).toReturn(testfoodentry, 'find');
            const results = await getFoodEntryData({userId : "abc"});
            expect(results.status).toBe(200);
            const actualResult = JSON.parse(JSON.stringify(results.json));
            delete actualResult._id;
            expect(actualResult).toEqual(JSON.parse(JSON.stringify(testfoodentry)))
          });
    })

  });