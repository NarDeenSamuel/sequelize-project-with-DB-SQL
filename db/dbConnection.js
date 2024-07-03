import { Sequelize } from 'sequelize'


const sequelize = new Sequelize('mysql://ua9mywgdsnckhjfj:ZtrP3wY9h1Oot4AD1McA@b9vkwusy1htwydddgh4b-mysql.services.clever-cloud.com:3306/b9vkwusy1htwydddgh4b')



try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize