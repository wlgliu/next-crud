import User from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string,
    data: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    let userId = req.query.userId || null
    if (userId == null || typeof userId == 'object') {
        return res.status(404).json({message: '参数错误', data: {} })
    }
    User.findByPk(userId).then((user: any) => {
        if (!user) {
            res.status(200).json({message: '用户不存在', data: {} })
        }
        user.name = 'leon1-1'
        user.email = 'leon1@gmail.com'
        return user.save()
    }).then(result => {
        res.status(200).json({message: '更新成功', data: result })
    }).catch(err => {
      console.log(`修改用户信息出错：${err}`);
    })
}