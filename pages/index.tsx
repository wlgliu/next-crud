import Head from "next/head";
import photo from '../public/images/photo-1.avif'
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return <>
        <Head>
            <title>首页</title>
        </Head>

        {/* <div className="w-52 h-52 bg-violet-600 flex justify-center items-center rounded-2xl">
            aa
        </div> */}
        
        {/* <button className="h-10 w-28 rounded-full m-5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-900">
            按钮
        </button> */}

        {/* <div className="mx-auto max-w-md bg-white rounded-xl text-black overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <Image className="h-48 w-full object-cover md:h-full md:w-48" src={photo} alt="Modern building architecture" />
                </div>
                <div className="p-8">
                    <div className="text-sm uppercase tracking-wide text-indigo-500 font-semibold">Company retreats</div>
                    <a href="#" className="block mt-1 leading-tight text-lg font-medium text-black hover:underline">Incredible accommodation for your team</a>
                    <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
                </div>
            </div>
        </div> */}
        
        
        <Link href='/user'>
        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700">用户列表</button>
        </Link>
 

    </>
}