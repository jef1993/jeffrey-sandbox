import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useInput from "../../components/Input/useInput";
import Input from "../../components/Input/Input";
import { fetchMockData } from "../../helpers/functions";

const Mutation: React.FC = () => {
  const title = useInput("");
  const text = useInput("");
  const queryClient = useQueryClient();
  useQuery(["posts"], () => {}, { initialData: () => [], enabled: false });
  const posts = queryClient.getQueryData<{ [key: string]: any }[]>(["posts"]);

  const createPost = useMutation({
    mutationFn: fetchMockData,
    onMutate: (variables) => {
      return "on Mutate";
    },

    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["posts"], (oldData) => {
        if (Array.isArray(oldData)) return [...oldData, data];
        return [data];
      });
      //   queryClient.invalidateQueries(["posts"]);
      console.log(context, data, variables);
    },
    onError: (error, variables, context) => {
      // Handle error if needed
    },
    onSettled: (data, error, variables, context) => {
      queryClient.refetchQueries(["posts"]);
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newPostData = { title: title.value, text: text.value };
    createPost.mutate(newPostData);
  };

  return (
    <div className="mutation">
      <form className="mutation__form" onSubmit={submitHandler}>
        <Input name="Title" {...title} />
        <Input name="Text" {...text} />
        <button className="mutatio__submit">
          {createPost.isLoading ? "Loading" : "Create Post"}
        </button>
      </form>
      <div className="mutation__result">
        {posts
          ? posts.map((data: { [key: string]: any }) => (
              <p key={data?.id}>
                <strong>{data?.title}</strong>
                {data?.text}
              </p>
            ))
          : "No post found."}
      </div>
    </div>
  );
};

export default Mutation;
