const nodemailer = require('nodemailer')

exports.sendEmail = async function(email) {
    let nodeMail = nodemailer.createTransport({
        service: 'qq', //类型qq邮箱
        port: 465, //上文获取的port
        secure: true, //上文获取的secure
        auth: {
            user: '2230383936@qq.com', // 发送方的邮箱，可以选择你自己的qq邮箱
            pass: 'oeyuqghimjncecca' // 上文获取的stmp授权码
        }
    });
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0') //生成6位随机验证码
        //发送邮件
    const mail = {
        from: `"致一开发团队"<2230383936@qq.com>`, // 发件人
        subject: '注册验证码', //邮箱主题
        to: email, //收件人，这里由post请求传递过来
        // 邮件内容，用html格式编写
        html: `
            <p>致一预约系统注册验证码邮件</p>
            <p>您正在通过邮件注册致一预约系统账号</p>
            <p>验证码是：<strong style="color:orangered;">${code}</strong>,请尽快填写</p>
            <p>免责声明：本邮件所包含信息发给指定个人或机构，邮件可能包含保密或专属信息。未经接收者许可，不得阅读、转发或传播邮件内容，或根据邮件内容采取任何相关行动。如果错误地收到了此邮件，请与收件人联系并自行删除邮件内容。</p>
            <p>Disclaimer：The information transmitted is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged material. Any review, retransmission, dissemination or other use of, or taking of any action in reliance upon, this information by persons or entities other than the intended recipient is prohibited. If you received this in error , please contact the sender and delete the material from any computer .</p>
        `
    };
    const result = {
        httpCode: 200,
        message: '验证码发送成功',
        code: code
    };
    await nodeMail.sendMail(mail, (err, info) => {
            if (!err) {
                return result;
            } else {
                result.httpCode = 500;
                result.message = '验证码发送失败';
            }
        })
        // if (result.httpCode === 200) {
        //     return result;
        // } else {
        //     return result;
        // }
    return result;
}