import nodemailer from 'nodemailer';
import { IEvent } from '../../models/types/event';
import { IUser } from '../../models/types/user';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'zoomitEvents@gmail.com',
        pass: 'zunhy123456',
    },
    tls: {
        rejectUnauthorized: false,
    }
});

const htmlTemplate = (user: IUser, event: IEvent) => 
    `<h2 style="text-align:center">הייי ${user.full_name}!</h2>
     <h3 style="text-align:center">
        <strong>
            איזה כיף לך! בקרוב תוכל/י להצטרף לאירוע מדהים!🤗🎉
        </strong>
     </h3>
     <p style="text-align:center">&nbsp;</p>
     <p style="text-align:center">פרטי האירוע:</p>
     <p style="text-align:center"><strong>שם האירוע- </strong>${event.title}</p>
     <p style="text-align:center"><strong>תיאור האירוע- </strong>${event.description}</p>
     <p style="text-align:center"><strong>זמן התחלה- </strong>${event.start_time.toLocaleString()}</p>
     <p style="text-align:center"><strong>זמן סיום- </strong>${event.end_time.toLocaleString()}</p>
     <p style="text-align:center"><strong>קישור לפגישת זום- </strong>${event.zoom_link}</p>
     ${event.password ? ('<p style="text-align:center"><strong>סיסמה- </strong>' + event.password + '</p>') : ''}
     <p style="text-align:center">&nbsp;</p> 
     <p style="text-align:center">* שים/י&nbsp;❤ מייל זה הוא אישי ואין להעבירו לאדם אחר.</p>
     <p style="text-align:center">יאללה תהנה/י!!!! ומחכים לראות אותך אצלנו שוב בקרוב &hearts;,</p>
     <p style="text-align:center">לכל בעיה שיש או סתם אם בא לך לדבר מוזמן/ת לפנות אלינו,</p>
     <p style="text-align:center">
        <a href="mailto:zoomitEvents@gmail.com">zoomitEvents@gmail.com</a>
    </p>
     <p style="text-align:center">
        <a href="http://zoomit.cs.colman.ac.il/">
            <img alt="" src="cid:zoomit" style="height:60px; width:205px" />
        </a>
    </p>`;

export default async (user: IUser, event: IEvent) => {
    const info = {
        from: '"Zoomit" <zoomitEvents@gmail.com>',
        to: user.email,
        subject: "איזה כיף! זה עוד מעט קורה!",
        html: htmlTemplate(user, event),
        attachments: [{
            filename: 'zoomit.png',
            path: __dirname +'/zoomit.png',
            cid: 'zoomit'
       }]
    };

    await transporter.sendMail(info, (err, info) => {
        if (err) {
            console.log(err);
        }
    });
}