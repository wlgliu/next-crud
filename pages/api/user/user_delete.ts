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
        return res.status(200).json({message: '参数错误', code: 400, data: {} })
    }
    User.findByPk(userId).then((user: any) => {
        if (!user) {
            res.status(404).json({message: '用户不存在', code: 404, data: {} })
        }
        return User.destroy({
            where: {
                id: userId
            }
        })
    }).then(result => {
        res.status(200).json({message: '删除成功', code: 200, data: result })
    }).catch(err => {
      console.log(`修改用户信息出错：${err}`);
    })
}