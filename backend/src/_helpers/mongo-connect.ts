import { seedUsers } from './user-seed';
import { connection, connect } from 'mongoose';


type DBInput = {
  connString: string;
};

export default ({ connString }: DBInput) => {
  const mongoConnect = () => {
      connect(connString, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => {
        seedUsers();
        return console.info(`Successfully connected to ${connString}`);
      })
      .catch((err: any) => {
        console.error(`Error connecting to database :`, err);
        return process.exit(1);
      });
  };

  mongoConnect();

  connection.on('disconnected', mongoConnect);
};
