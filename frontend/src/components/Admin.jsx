import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ActionIcon, Table, Menu, Modal } from '@mantine/core';
import useGetAllUsers from "../../hooks/user/use-get-all-users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useGetAccountInfo from "../../hooks/user/use-get-account";
import useGetUserTransactions from '../../hooks/user/use-get-user-transactions';
import { useState } from "react";
import useGetUserCount from "../../hooks/user/use-get-user-count";

const Admin = ({session}) => {

  if(!session?.session){
    window.location.replace("http://localhost:5173/login")
  }
  if (!session?.user[0].isAdmin){
    window.location.replace("http://localhost:5173/")
    return <div></div>
  }


  const { data: users, isLoading, isError } = useGetAllUsers();
  

  console.log("Session on dashboard: ", session);


  const [id, setId] = useState(0);
  const [transactionId, setTransactionId] = useState(0);

  const [accountInfoModal, setAccountInfoModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);

  const {
    data: account,
    isLoading: accountLoading,
    isError: accountError,
  } = useGetAccountInfo(id);
  const {
    data: transactions,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useGetUserTransactions(transactionId);

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const {
    data: count,
    isLoading: countLoading,
    isError: countError,
  } = useGetUserCount(month, year);

  console.log(count?.count);

  const week1 = count?.count.filter((week)=>week.week_no === 1)
  console.log("week1 ", week1)
  const week2 = count?.count.filter((week)=>week.week_no === 2)
  const week3 = count?.count.filter((week) => week.week_no === 3);
  const week4 = count?.count.filter((week)=>week.week_no === 4)
  console.log("week4 ", week4)
  const week5 = count?.count.filter((week) => week.week_no === 5);

  const one = week1 != null ? week1[0]?.count : 0;
  const two = week2 != null ? week2[0]?.count : 0;
  const three = week3 != null ? week3[0]?.count : 0;
  const four = week4 != null ? week4[0]?.count : 0;
  const five = week5 != null ? week5[0]?.count : 0;


  const data = [
    {
      name: "Week 1",
      users: one
    },
    {
      name: "Week 2",
      users: two
    },
    {
      name: "Week 3",
      users: three
    },
    {
      name: "Week 4",
      users: four
    },
    {
      name: "Extra days",
      users: five
    },
  ];
  return (
    <>
   {session?.session && <div className="grid grid-cols-2 mt-20 justify-center items-center p-3  ">
      <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
        <h2 className="text-2xl font-bold text-center">Customer Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              connectNulls
              type="monotone"
              dataKey="users"
              stroke="#00fcff"
              fill="#00fcff"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className=" flex flex-col  gap-20 items-center col-span-2 md:col-span-1">
        <div>
          <h2 className="text-2xl font-bold text-center">
            Customer satisfaction rate
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <div
            className="radial-progress color-primary"
            style={{ "--value": "70", "--size": "12rem", "--thickness": "2px" }}
          >
            70%
          </div>
          <div
            className="radial-progress color-primary"
            style={{
              "--value": "70",
              "--size": "12rem",
              "--thickness": "2rem",
            }}
          >
            70%
          </div>
        </div>
      </div>
      <div className="mt-10 col-span-2 p-3">
        <Table highlightOnHover withBorder withColumnBorders>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((user) => {
              return (
                <tr>
                  <td>{user.ID}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                  <td>{user.phone_no}</td>
                  <td>
                    <Menu width={200} shadow="sm">
                      <Menu.Target>
                        <ActionIcon>
                          <FontAwesomeIcon icon={faEllipsis} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Label>customer information</Menu.Label>
                        <Menu.Item
                          onClick={() => {
                            setId(user.ID);
                            setAccountInfoModal(account);
                          }}
                        >
                          show account information
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            setTransactionId(user.ID);
                            setTransactionModal(transactions);
                          }}
                        >
                          show all transactions
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal
        opened={accountInfoModal}
        onClose={() => setAccountInfoModal(false)}
        position="center"
      >
        <div>
          <Table captionSide="top">
            <caption className="font-bold">Account Info:</caption>
            <tr>
              <th>Account number:</th>
              <td>{account?.account[0]?.account_no}</td>
            </tr>
            <tr>
              <th>Account status:</th>
              <td>{account?.account[0]?.account_status}</td>
            </tr>
            <tr>
              <th>Account type:</th>
              <td>{account?.account[0]?.account_type}</td>
            </tr>
            <tr>
              <th>Time of creation:</th>
              <td>
                {new Date(account?.account[0]?.created_at).toDateString()}
              </td>
            </tr>
          </Table>
        </div>
      </Modal>

      <Modal
        opened={transactionModal}
        onClose={() => setTransactionModal(false)}
        position="center"
      >
        <div>
          <Table captionSide="top">
            <caption className="font-bold">Transaction Info:</caption>
            <thead>
              <th>Transaction type </th>
              <th>Time</th>
            </thead>
            <tbody>
              {transactions?.transactions?.map((transaction) => {
                return (
                  <tr>
                    <td>{transaction.transaction_type}</td>
                    <td>{transaction.time_stamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Modal>
    </div>}
    </>
  );
};

export default Admin;
