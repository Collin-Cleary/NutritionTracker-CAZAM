const mockingoose = require('mockingoose');
const {FoodItem, deleteFoodItem, createFoodItemData, getFoodItemData} = require("../models/foodItemModel");


describe('FoodItem Functions', () => {
    describe('delete Food Item', () => {
      it ('should return 204 on success', async () => {
        mockingoose(FoodItem).toReturn({}, 'findByIdAndDelete');
        const results = await deleteFoodItem(1);
        expect(results.status).toBe(204);
      });
    // Currently mockingoose isnt properly throwing the error meaing it cant be tested
    //   it ('should return 500 on failure', async () => {
    //     await mockingoose(FoodItem).toReturn(new Error("example database error"), 'findByIdAndDelete');
    //     const results = await deleteFoodItem(1);
    //     expect(results.status).toBe(500);
    //     expect(results.json).toBe({message : "example database error"})
    //   });
    });
    describe('create Food Item', () => {
        it ('should return 201 and the item on success', async () => {
            testfooditem = {nutrition : {vitamin : 5}, ingredients : "stuff", name : "food test", userId : "abc"}
            mockingoose(FoodItem).toReturn(testfooditem, 'save');
            const results = await createFoodItemData({vitamin : 5}, "food test", "stuff", 2);
            expect(results.status).toBe(201);
            const actualResult = JSON.parse(JSON.stringify(results.json));
            delete actualResult._id;
            expect(actualResult).toEqual(testfooditem)
          });
    })

    describe('find Food Item', () => {
        it ('should return 200 and the item on success', async () => {
            testfooditem = {nutrition : {vitamin : 5}, ingredients : "stuff", name : "food test", userId : "abc"}
            mockingoose(FoodItem).toReturn(testfooditem, 'find');
            const results = await getFoodItemData({userId : "abc"});
            expect(results.status).toBe(200);
            const actualResult = JSON.parse(JSON.stringify(results.json));
            delete actualResult._id;
            expect(actualResult).toEqual(testfooditem)
          });
    })

  });