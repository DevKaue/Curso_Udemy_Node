const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://kauesabino:gQlcCJ8YHSdCi1JB@cluster0.crjvegz.mongodb.net/',
                jwt_pass: 'kahnsbvfkanbfuyagb2974y234973264',
                jwt_expires: '7d'
            };
        case 'hml':
            return {
                bd_string: 'mongodb+srv://kauesabino:gQlcCJ8YHSdCi1JB@cluster0.crjvegz.mongodb.net/',
                jwt_pass: '',
                jwt_expires: ''
            };
        case 'prod':
            return {
                bd_string: 'mongodb+srv://kauesabino:gQlcCJ8YHSdCi1JB@cluster0.crjvegz.mongodb.net/',
                jwt_pass: 'kahnsbvfkanbfuyagb2974yçaojflha7gahl8g3flag7faw7fg3lf',
                jwt_expires: '7d'
            };
        default:
            throw new Error(`Ambiente '${env}' não reconhecido.`);
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
