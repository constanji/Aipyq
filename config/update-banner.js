const path = require('path');
const mongoose = require('mongoose');
const { v5: uuidv5 } = require('uuid');
const { Banner } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, askMultiLineQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  /**
   * Show the welcome / help menu
   */
  console.purple('--------------------------');
  console.purple('更新横幅！');
  console.purple('--------------------------');
  /**
   * Set up the variables we need and get the arguments if they were passed in
   */
  let displayFrom = '';
  let displayTo = '';
  let message = '';
  let isPublic = undefined;
  // If we have the right number of arguments, lets use them
  if (process.argv.length >= 3) {
    displayFrom = process.argv[2];
    displayTo = process.argv[3];
    message = process.argv[4];
    isPublic = process.argv[5] === undefined ? undefined : process.argv[5] === 'true';
  } else {
    console.orange(
      '用法: npm run update-banner <displayFrom(格式: yyyy-mm-ddTHH:MM:SSZ)> <displayTo(格式: yyyy-mm-ddTHH:MM:SSZ)> <message> <isPublic(true/false)>',
    );
    console.orange('注意: 如果不传入参数，系统会提示您输入。');
    console.purple('--------------------------');
  }

  /**
   * If we don't have the right number of arguments, lets prompt the user for them
   */
  if (!displayFrom) {
    displayFrom = await askQuestion('开始显示时间 (格式: yyyy-mm-ddTHH:MM:SSZ, 默认: 现在):');
  }

  // Validate the displayFrom format (ISO 8601)
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  if (displayFrom && !dateTimeRegex.test(displayFrom)) {
    console.red('错误: displayFrom 日期格式无效。请使用 yyyy-mm-ddTHH:MM:SSZ。');
    silentExit(1);
  }

  displayFrom = displayFrom ? new Date(displayFrom) : new Date();

  if (!displayTo) {
    displayTo = await askQuestion(
      '结束显示时间 (格式: yyyy-mm-ddTHH:MM:SSZ, 默认: 不指定):',
    );
  }

  if (displayTo && !dateTimeRegex.test(displayTo)) {
    console.red('错误: displayTo 日期格式无效。请使用 yyyy-mm-ddTHH:MM:SSZ。');
    silentExit(1);
  }

  displayTo = displayTo ? new Date(displayTo) : null;

  if (!message) {
    message = await askMultiLineQuestion(
      '请输入您的消息 ((在新行输入单个点 "." 以完成)):',
    );
  }

  if (message.trim() === '') {
    console.red('错误: 消息不能为空！');
    silentExit(1);
  }

  if (isPublic === undefined) {
    const isPublicInput = await askQuestion('是否公开 (y/N):');
    isPublic = isPublicInput.toLowerCase() === 'y' ? true : false;
  }

  // Generate the same bannerId for the same message
  // This allows us to display only messages that haven't been shown yet
  const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // Use an arbitrary namespace UUID
  const bannerId = uuidv5(message, NAMESPACE);

  let result;
  try {
    // There is always only one Banner record in the DB.
    // If a Banner exists in the DB, it will be updated.
    // If it doesn't exist, a new one will be added.
    const existingBanner = await Banner.findOne();
    if (existingBanner) {
      result = await Banner.findByIdAndUpdate(
        existingBanner._id,
        {
          displayFrom,
          displayTo,
          message,
          bannerId,
          isPublic,
        },
        { new: true },
      );
    } else {
      result = await Banner.create({
        displayFrom,
        displayTo,
        message,
        bannerId,
        isPublic,
      });
    }
  } catch (error) {
    console.red('错误: ' + error.message);
    console.error(error);
    silentExit(1);
  }

  if (!result) {
    console.red('错误: 更新横幅时出现问题！');
    console.error(result);
    silentExit(1);
  }

  console.green('横幅更新成功！');
  console.purple(`横幅ID: ${bannerId}`);
  console.purple(`开始时间: ${displayFrom}`);
  console.purple(`结束时间: ${displayTo || '未指定'}`);
  console.purple(`横幅内容: ${message}`);
  console.purple(`是否公开: ${isPublic}`);
  silentExit(0);
})();

process.on('uncaughtException', (err) => {
  if (!err.message.includes('fetch failed')) {
    console.error('发生未捕获的错误:');
    console.error(err);
  }

  if (err.message.includes('fetch failed')) {
    return;
  } else {
    process.exit(1);
  }
});
