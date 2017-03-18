'use strict';

const mysql = require('mysql');
const $conf = require('../database/mysqlDB.js');
const pool = mysql.createPool($conf.mysql);
const Q = require('q');

/**
 * 获取全部分类
 */
function getAllClassify() {
    const defer = Q.defer();
    pool.getConnection(function (err,connection){
        connection.query('SELECT * FROM classify',function (err,result) {
            if(!err){
                defer.resolve(result);
            }
            else{
                console.log(err);
                defer.reject(err);
            }
            connection.release();
        });
    });
    return defer.promise;
}

/**
 * 新增文章分类
 */
function addClassify(classify) {
    const defer = Q.defer();
    pool.getConnection(function (err,connection) {
        connection.query('INSERT INTO classify(id,classify,state) VALUES(0,"'+classify+'",0)',function (err,result) {
            if(!err){
                defer.resolve(result);
            }
            else{
                console.log(err);
                defer.reject(err);
            }
            connection.release();
        });
    });
    return defer.promise;
}

module.exports = {
    getAllClassify:getAllClassify,           //获取全部分类
    addClassify:addClassify,                 //新增文章分类
}