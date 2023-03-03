/*
Jr Fullstack Developer Test - Webcat

Welcome to the Technical test for Jr Fullstack Developer

We hope that everything is fully clear and understandable.
However, if you have any questions, please send us an email
to support@webcat.app with the subject "Jr Fullstack Test Questions"
*/

import $t from './libs/test.js'
import _ from "lodash"
/*
1. Data manipulation:
  1. Transform the source data to the target data.
  2. Return the target data.

  Source data:
    You can inspect the source data at /libs/1-source-data.js
  Target Data:
    {
      balance: 1606400,
      income: 3900000,
      expenses: 2293600,
      byCategories: {
        Restaurants: -43600,
        Income: 3900000,
        Groceries: -250000,
        Rent: -2000000
      }
    }

  Hint: Use native array methods as well as
    Lodash(https://lodash.com/docs) modules.
*/
const source = $t.source(1);
$t.answer(1, async () => {
  // Your code goes here

  const transactions = source;
  let income = 0;
  let expenses = 0;

  const calculateBalance = (transactions) => {
      income = _.sumBy(transactions, e => {
        return e.type === 'income' ? e.amount : 0;
      });
      expenses = _.sumBy(transactions, e => {
        return e.type === 'expense' ? e.amount : 0;
      });
      return income - expenses;
    };

  const calculateByCategories = (transactions) => {
    const result = _.mapValues(_.groupBy(transactions, 'category'), (transactions) =>
      _.sumBy(transactions, 'amount')
    );
    result.Income = result.Income || 0;
    result.Income = Math.max(result.Income, 0);
    return _.mapValues(result, (value, key) => (key === 'Income' ? value : -value));
  };

  const balance = calculateBalance(transactions);
  const byCategories = calculateByCategories(transactions);

  const result = {
    balance,
    income,
    expenses,
    byCategories,
  };

  return result;

})
/*
2. Asynchronous programming: 
  1. First get the list of ids from the async function $source.getIds()
  2. Then, for every id call the async function $source.getText(id) to get its text
  3. Finally, return the list of resulting texts as an array.
  
  */
 const $source = $t.source(2)
 $t.answer(2, async () => {
   // Your code goes here:
      // 1. Get ids: $source.getIds()
      const ids = await $source.getIds()
      // 2. Get text for every id: $source.getText(id)
      const texts = _.map(ids,async (id) => {
        return await $source.getText(id);
      })
      // 3. Return array of texts
      const text = Promise.all(texts);
      return text;
});