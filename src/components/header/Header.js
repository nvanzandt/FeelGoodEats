

export default function Header() {


  return (
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-[22px] lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
             <h1 class="text-2xl font-bold hover:text-green-500">FeelGoodEats</h1>
          </a>
        </div>
       
        <div >
          <a href="/add-listing" >
            <button class="bg-green-500 text-white px-4 py-2 border shadow hover:bg-green-600 duration-300 rounded-md mr-4">Add listing</button>
          </a>
          <a href="#" >
            <button class="bg-green-500 text-white px-4 py-2 border shadow hover:bg-green-600 duration-300 rounded-md">Log in</button>
          </a>
        </div>
      </nav>
    </header>
  )
}