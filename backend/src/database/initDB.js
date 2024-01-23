import "dotenv/config.js";
import connectDB from "./db.js";

const db = connectDB();

const DB_NAME = process.env.MYSQL_DB;

console.log("Limpiando base de datos...");
await db.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);

console.log("Creando base de datos...");
await db.query(`CREATE DATABASE ${DB_NAME}`);

await db.query(`USE ${DB_NAME}`);

console.log("Creando tabla usuarios...");
await db.query(`
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    photo VARCHAR(255),
    nickName VARCHAR(64) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(64) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("Creando table de ubicaciones...");
await db.query(`
CREATE TABLE locations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100) NOT NULL
);
`);

console.log("Creando columnas de ubicaciones...");
await db.query(`
INSERT INTO locations (country) VALUES
('Afghanistan'),
('Aland Islands'),
('Albania'),
('Algeria'),
('American Samoa'),
('Andorra'),
('Angola'),
('Anguilla'),
('Antarctica'),
('Antigua and Barbuda'),
('Argentina'),
('Armenia'),
('Aruba'),
('Australia'),
('Austria'),
('Azerbaijan'),
('Bahamas'),
('Bahrain'),
('Bangladesh'),
('Barbados'),
('Belarus'),
('Belgium'),
('Belize'),
('Benin'),
('Bermuda'),
('Bhutan'),
('Bolivia'),
('Bonaire, Sint Eustatius and Saba'),
('Bosnia and Herzegovina'),
('Botswana'),
('Bouvet Island'),
('Brazil'),
('British Indian Ocean Territory'),
('Brunei Darussalam'),
('Bulgaria'),
('Burkina Faso'),
('Burundi'),
('Cambodia'),
('Cameroon'),
('Canada'),
('Cape Verde'),
('Cayman Islands'),
('Central African Republic'),
('Chad'),
('Chile'),
('China'),
('Christmas Island'),
('Cocos (Keeling) Islands'),
('Colombia'),
('Comoros'),
('Congo'),
('Congo, Democratic Republic of the Congo'),
('Cook Islands'),
('Costa Rica'),
('Cote D''Ivoire'),
('Croatia'),
('Cuba'),
('Curacao'),
('Cyprus'),
('Czech Republic'),
('Denmark'),
('Djibouti'),
('Dominica'),
('Dominican Republic'),
('Ecuador'),
('Egypt'),
('El Salvador'),
('Equatorial Guinea'),
('Eritrea'),
('Estonia'),
('Ethiopia'),
('Falkland Islands (Malvinas)'),
('Faroe Islands'),
('Fiji'),
('Finland'),
('France'),
('French Guiana'),
('French Polynesia'),
('French Southern Territories'),
('Gabon'),
('Gambia'),
('Georgia'),
('Germany'),
('Ghana'),
('Gibraltar'),
('Greece'),
('Greenland'),
('Grenada'),
('Guadeloupe'),
('Guam'),
('Guatemala'),
('Guernsey'),
('Guinea'),
('Guinea-Bissau'),
('Guyana'),
('Haiti'),
('Heard Island and Mcdonald Islands'),
('Holy See (Vatican City State)'),
('Honduras'),
('Hong Kong'),
('Hungary'),
('Iceland'),
('India'),
('Indonesia'),
('Iran, Islamic Republic of'),
('Iraq'),
('Ireland'),
('Isle of Man'),
('Israel'),
('Italy'),
('Jamaica'),
('Japan'),
('Jersey'),
('Jordan'),
('Kazakhstan'),
('Kenya'),
('Kiribati'),
('Korea, Democratic People''s Republic of'),
('Korea, Republic of'),
('Kosovo'),
('Kuwait'),
('Kyrgyzstan'),
('Lao People''s Democratic Republic'),
('Latvia'),
('Lebanon'),
('Lesotho'),
('Liberia'),
('Libyan Arab Jamahiriya'),
('Liechtenstein'),
('Lithuania'),
('Luxembourg'),
('Macao'),
('Macedonia, the Former Yugoslav Republic of'),
('Madagascar'),
('Malawi'),
('Malaysia'),
('Maldives'),
('Mali'),
('Malta'),
('Marshall Islands'),
('Martinique'),
('Mauritania'),
('Mauritius'),
('Mayotte'),
('Mexico'),
('Micronesia, Federated States of'),
('Moldova, Republic of'),
('Monaco'),
('Mongolia'),
('Montenegro'),
('Montserrat'),
('Morocco'),
('Mozambique'),
('Myanmar'),
('Namibia'),
('Nauru'),
('Nepal'),
('Netherlands'),
('Netherlands Antilles'),
('New Caledonia'),
('New Zealand'),
('Nicaragua'),
('Niger'),
('Nigeria'),
('Niue'),
('Norfolk Island'),
('Northern Mariana Islands'),
('Norway'),
('Oman'),
('Pakistan'),
('Palau'),
('Palestinian Territory, Occupied'),
('Panama'),
('Papua New Guinea'),
('Paraguay'),
('Peru'),
('Philippines'),
('Pitcairn'),
('Poland'),
('Portugal'),
('Puerto Rico'),
('Qatar'),
('Reunion'),
('Romania'),
('Russian Federation'),
('Rwanda'),
('Saint Barthelemy'),
('Saint Helena'),
('Saint Kitts and Nevis'),
('Saint Lucia'),
('Saint Martin'),
('Saint Pierre and Miquelon'),
('Saint Vincent and the Grenadines'),
('Samoa'),
('San Marino'),
('Sao Tome and Principe'),
('Saudi Arabia'),
('Senegal'),
('Serbia'),
('Serbia and Montenegro'),
('Seychelles'),
('Sierra Leone'),
('Singapore'),
('Sint Maarten'),
('Slovakia'),
('Slovenia'),
('Solomon Islands'),
('Somalia'),
('South Africa'),
('South Georgia and the South Sandwich Islands'),
('South Sudan'),
('Spain'),
('Sri Lanka'),
('Sudan'),
('Suriname'),
('Svalbard and Jan Mayen'),
('Swaziland'),
('Sweden'),
('Switzerland'),
('Syrian Arab Republic'),
('Taiwan, Province of China'),
('Tajikistan'),
('Tanzania, United Republic of'),
('Thailand'),
('Timor-Leste'),
('Togo'),
('Tokelau'),
('Tonga'),
('Trinidad and Tobago'),
('Tunisia'),
('Turkey'),
('Turkmenistan'),
('Turks and Caicos Islands'),
('Tuvalu'),
('Uganda'),
('Ukraine'),
('United Arab Emirates'),
('United Kingdom'),
('United States'),
('United States Minor Outlying Islands'),
('Uruguay'),
('Uzbekistan'),
('Vanuatu'),
('Venezuela'),
('Viet Nam'),
('Virgin Islands, British'),
('Virgin Islands, U.s.'),
('Wallis and Futuna'),
('Western Sahara'),
('Yemen'),
('Zambia'),
('Zimbabwe');
`);

console.log("Creando tabla recomendaciones...");
await db.query(`
CREATE TABLE recommendations (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    locationId INT UNSIGNED NOT NULL,
    lean_in VARCHAR(100) NULL,
    userId INT UNSIGNED NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (locationId) REFERENCES locations(id)
);
`);

// console.log("Creando columna de categorias...");
// await db.query(`
// INSERT INTO recommendations (category) VALUES
// ('Beach'),
// ('Rural'),
// ('Cultural'),
// ('Nature'),
// ('Historic'),
// ('City'),
// ('Gastronomy'),
// ('Other')
// `);

console.log("Creando tabla de fotos de recomendaciones...");
await db.query(`
CREATE TABLE recommendationPhotos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    recommendationId INT UNSIGNED NOT NULL,
    url VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (recommendationId) REFERENCES recommendations(id)
);
`);

console.log("Creando tabla comentarios...");
await db.query(`
CREATE TABLE comments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    recommendationId INT UNSIGNED NOT NULL,
    userId INT UNSIGNED NOT NULL,
    
    FOREIGN KEY (recommendationId) REFERENCES recommendations(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
`);

console.log("Creando tabla de likes de recomendaciones...");
await db.query(`
CREATE TABLE recommendationLikes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    recommendationId INT UNSIGNED NOT NULL,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY (recommendationId) REFERENCES recommendations(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    UNIQUE(userId, recommendationId)
);
`);

console.log("Base de datos inicializada");

await db.end();
