import { useEffect, useState } from "react";

const ProblemDescripton = () => {
  const [code, setCode] = useState(`
#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}
`);

  const [lang, setLang] = useState("cpp");

  const fetchProblem = async () => {
    try {
      const problem_id = window.location.pathname.split("/").pop();

      const res = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/problem/${problem_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      res = await res.json();
      if (res.ok) {
        console.log(res);
      } else {
        console.error("Error fetching problem:", res.message);
      }
    } catch (error) {
      console.log("Error retrieving problem description: ", error.message);
    }
  };

  useEffect(() => {
    fetchProblem();
  });

  return (
    <>
      <div></div>
    </>
  );
};

export default ProblemDescripton;
