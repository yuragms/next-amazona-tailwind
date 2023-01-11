import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  await db.connect();

  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default handler;

// import { getSession } from 'next-auth/react';
// import Order from '../../../../models/Order';
// import db from '../../../../utils/db';

// const handler = async (req, res) => {
//   const session = await getSession({ req });
//   if (!session) {
//     return res.status(401).send('signin required');
//   }
//   await db.connect();

//   let order = await Order.findById(req.query.id);
//   order ? (order = db.convertDocToObj(order)) : null;
//   await db.disconnect();
//   res.send(order);
// };

// export default handler;
