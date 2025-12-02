import { redirect } from "next/navigation";

const data = {a: 1, b: 2};
function exampleDestruct({a, b}: {a: number, b: number}) {
    console.log(a, b);
    return <p className="text-sm text-gray-500">{a} + {b} = {a + b}</p>;
}


export default async function BlankPage(props: {searchParams: Promise<{page?: integer}>}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page
  console.log('I am the blank page');
  return <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="text-lg font-bold">Example of a Distruct Function</h2>
    {exampleDestruct(data)}
    <h2 className="text-lg font-bold">Page hack</h2>
    {/* <input type="number" onChange={(e) => {
      redirect(`/blank?page=${e.target.value}`);
    }} /> */}
    {page && <p className="text-sm text-gray-500">Page: {page}</p>}
  </div>;
}