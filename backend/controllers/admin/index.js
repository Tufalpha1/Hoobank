const connection = require("../../database/connection");


exports.getAccountInfo = async (id) =>{
    let accountQuery = `SELECT * FROM accounts WHERE customer_id = '${id}';`;

    try {
      var [accountInfo, _] = await connection.execute(accountQuery);
      console.log(accountInfo);
    } catch (error) {
      console.error(error);
    }

    return accountInfo;
}

exports.getTransactionInfo = async(id) =>{

    let accountIDQuery = `SELECT account_no FROM accounts WHERE customer_id = '${id}';`;
    var [accountID, _] = await connection.execute(accountIDQuery);

    if(accountID.length > 0){
        let transactionQuery = `SELECT * FROM transactions WHERE account_no = '${accountID[0]?.account_no}';`;

        try {
          var [transactionInfo, _] = await connection.execute(transactionQuery);
          console.log(transactionInfo);
        } catch (error) {
          console.error(error);
        }
    }
    
    return transactionInfo;
}

exports.getAllUsers = async () => {
    try {
        let userQuery = `SELECT * FROM customers`;
        const [users, _] = await connection.execute(userQuery);

        return users;

    } catch (error) {
        console.error(error);
        return false;
    }

};

exports.getUserCount = async (month, year) => {
     try {
       let countQuery = `SELECT count(*) AS count, (week(created_at) - week('${year}-${month}-01') + 1) AS week_no 
       FROM accounts WHERE created_at <= '${year}-${month}-31' AND created_at >= '${year}-${month}-01'
       GROUP BY week_no;`;
       const [count, _] = await connection.execute(countQuery);

       return count;
     } catch (error) {
       console.error(error);
       return false;
     }
}
