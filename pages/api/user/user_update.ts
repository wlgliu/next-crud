import User from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string,
    code: number,
    data: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    let userId = req.query.userId || null
    if (userId == null || typeof userId == 'object') {
        return res.status(404).json({message: '用户Id错误', code: 400, data: {} })
    }

    let name = req.query.name || null
    if (name === null || typeof name == 'object') {
      return res.status(200).json({message: '名字错误', code: 400, data: {} })
    }

    let email = req.query.email || null
    if (email === null || typeof email == 'object') {
      return res.status(200).json({message: '邮箱错误', code: 400, data: {} })
    }

    User.findByPk(userId).then((user: any) => {
        if (!user) {
            res.status(200).json({message: '用户不存在', code: 404, data: {} })
        }
        user.name = name
        user.email = email
        return user.save()
    }).then(result => {
        res.status(200).json({message: '更新成功', code: 200, data: result })
    }).catch(err => {
      console.log(`修改用户信息出错：${err}`);
    })
}