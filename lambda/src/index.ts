import { Column, DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm';

let appDataSource: DataSource;

export const handler = async (event: any) => {
  try {
    // Reuse existing connection if available

    if(!appDataSource || !appDataSource.isInitialized) {
        appDataSource = new DataSource({
        type: 'mysql', // Change to 'mysql' or 'mariadb' if needed
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: true,
        entities: [User],
        subscribers: [],
        migrations: [],
     });
     await appDataSource.initialize()
    }

    const userRepository = appDataSource.getRepository(User);
    const users = await userRepository.find();  // Fetch all users

    return users  // Return users as JSON response;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error connecting to the database' }),
    };
  }
};


@Entity({name: 'USER'}) // Specify the table name
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', length: 100, name:'name'})
  name: string | undefined;

  @Column({ type: 'varchar', length: 100, name:'email' })
  email: string | undefined
}