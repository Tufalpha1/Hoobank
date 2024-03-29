const connection = require("../../database/connection");



exports.addUser = async (email, password, name, address, phone, city, type) => {
  try {
    let getBranchQuery = `SELECT ID FROM branch WHERE city = '${city}';`;
    var [branchId, _] = await connection.execute(getBranchQuery);

    let insertCustomer = `INSERT INTO customers (email, name, address, phone_no, branch_id)
        VALUES('${email}', '${name}', '${address}', '${phone}', '${branchId[0].ID}');`;

    var [isCustomerAdded, _] = await connection.execute(insertCustomer);

    let getCustomerID = `SELECT ID FROM customers WHERE email = '${email}';`;
    var [customerId, _] = await connection.execute(getCustomerID);



    if (isCustomerAdded) {
      let makeLogin = `INSERT INTO login (email, password, isAdmin) 
                            VALUES ('${email}', '${password}', ${false})`;

      var [isLoginMade, _] = await connection.execute(makeLogin);

      let makeAccount = `INSERT INTO accounts (account_status, account_type, customer_id, branch_id)
      VALUES ('active', '${type}', '${customerId[0].ID}', '${branchId[0].ID}');`;

      var [accountCreated, _] = await connection.execute(makeAccount);
    }
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};


exports.loginUser = async (email, password) => {
  try {
   
    let loginQuery = `SELECT * FROM login WHERE email = '${email}' AND password = '${password}'`;

    var [exists, _] = await connection.execute(loginQuery);

    console.log("User: ", exists);
    // prints empty array which is still considered data
    // so the if condition evaluates to true

    if (exists.length > 0) {
     return exists;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
