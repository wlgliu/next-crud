import { message } from "antd"
import Link from "next/link"
import { useState } from "react"

export interface UserItem {
    id: number,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

enum EditAndCreate {
    Edit = 'edit',
    Create = 'create'
}

export default function Users({data}: {data: {message: string, code: number, data: UserItem[]}}) {
    const [users, setUsers] = useState([...data.data])

    const [diglogInfo, setDiglogInfo] = useState<{
        show: boolean,
        type: EditAndCreate,
        name: string | null,
        email: string | null,
        id: number | null
    }>({
        show: false,
        type: EditAndCreate.Create,
        name: null,
        email: null,
        id: null,
    })

    const getUsers =async () => {
        const res = await fetch(`/api/user/users`)
        const data = await res.json()

        if (data.code !== 200) {
            message.error('数据获取失败')
            return
        }

        setUsers(data.data)
    }

    const postCreateUser = async () => {
        const res = await fetch(`/api/user/user_create?name=${diglogInfo.name}&email=${diglogInfo.email}`)
        const data = await res.json()

        console.log('data', data);
        if (data.code !== 200) {
            message.error('数据获取失败')
            return
        }

        setDiglogInfo({
            ...diglogInfo,
            show: false,
            name: null,
            email: null,
        })
        getUsers()
        message.success('创建成功')
    }

    const deleteUser = async (id: number) => {
        const res = await fetch(`/api/user/user_delete?userId=${id}`)
        const data = await res.json()

        if (data.code !== 200) {
            message.error('删除失败')
            return
        }

        getUsers()
        message.success('删除成功')
    }

    const updateUser = async () => {
        const res = await fetch(`/api/user/user_update?userId=${diglogInfo.id}&name=${diglogInfo.name}&email=${diglogInfo.email}`)
        const data = await res.json()

        if (data.code !== 200) {
            message.error('修改失败')
            return
        }

        setDiglogInfo({
            ...diglogInfo,
            show: false,
        })
        getUsers()
        message.success('修改成功')
    }

    if (data.code !== 200) {
        return <div>数据获取失败</div>
    }

    return <div className="container m-auto border-2 border-gray-400 mt-4 bg-white shadow-md">
        <table className="border-collapse border border-slate-500 min-w-max w-full table-auto">
            <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-6 text-left">序号</th>
                    <th className="py-3 px-6 text-left">名字</th>
                    <th className="py-3 px-6 text-left">邮箱</th>
                    <th className="py-3 px-6 text-left">创建时间</th>
                    <th className="py-3 px-6 text-left">更新时间</th>
                    <th className="py-3 px-6 text-left">
                        <div className="flex justify-between items-center">
                            <div>操作</div>
                            <button  onClick={() => setDiglogInfo({...diglogInfo, type: EditAndCreate.Create, name: null, email: null, show: true})} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">添加</button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {
                    users.map((item, index) => {
                        return <tr className="border-b border-gray-200 hover:bg-gray-100" key={item.id}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{index}</td>
                            <td className="py-3 px-6 text-left">{item.name}</td>
                            <td className="py-3 px-6 text-left">{item.email}</td>
                            <td className="py-3 px-6 text-left">{item.createdAt}</td>
                            <td className="py-3 px-6 text-left">{item.updatedAt}</td>
                            <td className="py-3 px-6 text-left">
                                <button onClick={() => {
                                    setDiglogInfo({
                                        type: EditAndCreate.Edit,
                                        show: true,
                                        name: item.name,
                                        email: item.email,
                                        id: item.id,
                                    })
                                }} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2">编辑</button>
                                <button onClick={() => deleteUser(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">删除</button>
                                    <Link href={`/user/${item.id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">详情</button>
                                    </Link>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>

        { diglogInfo.show && <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* <!-- 蒙版 --> */}
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* <!-- 弹框 --> */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        {/* <!-- Form --> */}
                        <div className=" w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">填写信息</h3>
                            <div className="mt-5">
                            <form action="#" method="POST" className="space-y-6">
                                <div>
                                <label className="block text-sm font-medium text-gray-700">姓名</label>
                                <div className="mt-1">
                                    <input onChange={(e) => setDiglogInfo({...diglogInfo, name: e.target.value})} value={diglogInfo.name??''} type="text" name="name" id="name" required className="shadow-sm block w-full h-8 px-3 sm:text-sm border-gray-800 rounded-md text-black" />
                                </div>
                                </div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700">邮箱</label>
                                <div className="mt-1">
                                    <input onChange={(e) => setDiglogInfo({...diglogInfo, email: e.target.value})} value={diglogInfo.email??''} id="email" name="email" type="email" required className="shadow-sm block w-full h-8 px-3 sm:text-sm border-gray-800 rounded-md text-black" />
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- 底部按钮 --> */}
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={() => {
                        if (!diglogInfo.name || !diglogInfo.email) {
                            message.info('名字或邮箱不能为空')
                            return
                        }
                        
                        diglogInfo.type === EditAndCreate.Create
                            ? postCreateUser()
                            : updateUser()
                    }} type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                        提交
                    </button>
                    <button onClick={() => setDiglogInfo({...diglogInfo, show: false})} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                        取消
                    </button>
                </div>
                </div>
            </div>
        </div>}

    </div>
}

export async function getServerSideProps() {
    const res = await fetch(`http://0.0.0.0:3001/api/user/users`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}