import { v4 as uuidv4 } from "uuid";

export const fetchMockData = async (data: { [key: string]: any }) => {
  // Simulate an API response
  const response = {
    data: {
      id: uuidv4(),
      ...data,
    },
  };
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return response.data;
};
