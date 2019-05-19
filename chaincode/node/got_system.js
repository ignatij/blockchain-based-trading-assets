/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {

  // The Init method is called when the Smart Contract 'fabcar' is instantiated by the blockchain network
  // Best practice is to have any Ledger initialization in separate function -- see initLedger()
  async Init(stub) {
    console.info('=========== Instantiated fabcar chaincode ===========');
    return shim.success();
  }

  // The Invoke method is called as a result of an application request to run the Smart Contract
  // 'fabcar'. The calling application program has also specified the particular smart contract
  // function to be called, with arguments
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.error('no function of name:' + ret.fcn + ' found');
      throw new Error('Received unknown function ' + ret.fcn + ' invocation');
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  async getItemHistory(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting ItemId.');
    }
    let itemId = args[0];

    let iterator = await stub.getHistoryForKey(itemId);
    let results = [];
    let res = { done: false };
    while (!res.done) {
      res = await iterator.next();

      if (res && res.value && res.value.value) {
        let val = res.value.value.toString('utf8');
        if (val.length > 0) {
          results.push(JSON.parse(val));
        }
      }
      if (res && res.done) {
        try {
          iterator.close();
        }
        catch (err) {
        }
      }
    }
    console.log(results);
    return Buffer.from(JSON.stringify(results));
  }

  async initLedger(stub, args) {
    console.info('============= START : Initialize Ledger ===========');
    console.info('============= END : Initialize Ledger ===========');
  }

  async addItem(stub, args) {
    console.info('============= START : Create Item ===========');
    if (args.length != 6) {
      throw new Error('Incorrect number of arguments. Expecting 6');
    }

    const item = {
      docType: 'item',
      name: args[1],
      description: args[2],
      owner: args[3],
      price: args[4],
      image: args[5]
    };

    await stub.putState(args[0], Buffer.from(JSON.stringify(item)));
    console.info('============= END : Create Item ===========');
    return Buffer.from(JSON.stringify(item));
  }

  async queryAll(stub, args) {

    let iterator = await stub.getStateByRange('', '');

    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;
        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return Buffer.from(JSON.stringify(allResults));
      }
    }
  }

  async changeItemOwner(stub, args) {
    console.info('============= START : changeItemOwner ===========');
    if (args.length != 2) {
      throw new Error('Incorrect number of arguments. Expecting 2');
    }

    let itemAsBytes = await stub.getState(args[0].toString());
    let item = JSON.parse(itemAsBytes);
    item.owner = args[1];
    await stub.putState(args[0], Buffer.from(JSON.stringify(item)));
    console.info('============= END : changeItemOwner ===========');
  }
};

shim.start(new Chaincode());
