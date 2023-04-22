import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { UserItem } from "."
import { message } from "antd"

export default function UserDetail() {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState<UserItem | null>()

    useEffect(() => {
        if(id === undefined) return
        
        const getUser =async () => {
            const res = await fetch(`/api/user/user_find?userId=${id}`)
            const data = await res.json()
    
            if (data.code !== 200) {
                message.error('数据获取失败')
                return
            }
    
            setData(data.data)
        }
        getUser()
    }, [id])

    return <>
        <h1>用户详情{id}</h1>
        <div>
            <pre>
                { JSON.stringify(data, null, 2) }
            </pre>
        </div>
    </>
}