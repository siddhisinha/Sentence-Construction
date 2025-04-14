// import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
// import { Button } from "./components/ui/button";

function App() {
  // const [posts, setPosts] = useState([]);

  // const post = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/posts");
  //     const data = await response.json();
  //     setPosts(data); 
  //   } catch (error) {
  //     alert("Can't fetch");
  //   }
  // };
  // useEffect(() => {
  //   post();
    
  // }, []);
  // console.log(posts,"liip")
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
// min-h-svh
{/* <ul className="mt-4 space-y-2">
{posts.map((p: any) => (
  <li key={p.id} className="border p-2 rounded">
    <h3 className="font-semibold">{p.title}</h3>
    <span>{p.views}</span>
  </li>
))}
</ul>
<div
className="flex flex-col items-center justify-center">
<Button className="bg-blue-500 text-black hover:bg-yellow-50">Click me</Button>
</div> */}
