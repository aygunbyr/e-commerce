import { useMemo } from "react";
import { Link } from "react-router-dom";
// useQuery for read, useMutation for Create, Update, Delete operations
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Box, Text } from "@chakra-ui/react";
import { Table, Popconfirm } from "antd";
import { fetchProductList, deleteProduct } from "../../../api";

function AdminProducts() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("success");
                  },
                });
              }}
              onCancel={() => {
                console.log("canceled");
              }}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Link to="#" style={{ marginLeft: 10 }}>
                Delete
              </Link>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return (
    <div>
      <Text fontSize="2xl" p="5">
        Products
      </Text>

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
}

export default AdminProducts;
