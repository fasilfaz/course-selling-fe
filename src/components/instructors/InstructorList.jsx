import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

const InstructorList = () => {
  const [instructors, setInstructors] = useState("");

  useEffect(() => {
    const getInstructors = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/instructor/get-instructors",
      );
      const insData = await res.data;
      setInstructors(insData);
    };
    getInstructors();
  }, []);

  return (
    <div className="m-3 border ">
      <TableContainer>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                        <Tr>
                            <Th>Instructor Name</Th>
                            <Th>Email</Th>
                            <Th>Remove</Th>
                        </Tr>
                </Thead>
                <Tbody>
                    {instructors &&
                    instructors.map((instructor, index) => (
                        <>
                            <Tr key={index}>
                                <Th>{instructor.name}</Th>
                                <Th>{instructor.email}</Th>
                                <Th>
                                    <button
                                        onClick={async () => {
                                        const res = await axios.delete(
                                            `http://localhost:3000/api/v1/instructor/delete-instructors/${instructor._id}`,
                                        );
                                        const data = await res.data;
                                        console.log(data);
                                        if (data === "removed sucessfully") {
                                            window.location.reload();
                                        }
                                        }}
                                        className="rounded-md bg-red-500 px-2 py-1 text-white">
                                        Remove
                                    </button>
                                </Th>
                            </Tr>
                        </>
                    ))};
                </Tbody>
            </Table>
      </TableContainer>
    </div>
  );
};

export default InstructorList;