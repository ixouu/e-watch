const categories = ["Child", "Female", "Male"];
const categoriesText = {
    Child: 'Vous êtes à la recherche d\'un cadeau idéal pour faire plaisir à un enfant ou à un ado ? La première montre, qu\elle soit chère ou pas, reste longtemps inscrite dans la mémoire des petites et des petits. C\'est un souvenir d\'enfance, bien gardé.',
    Female: 'Accessoires de mode par excellence" ou "bijoux précieux intemporels", les montres pour femme, en général, dévoilent une partie de leur personnalité. Elles font ressortir la beauté intérieure, celle qui se passe de mots. Originales, fines, tendances ou classiques, excentriques ou discrètes, sobres ou décalées, noires, dorées, argentées, blanches, bleues... les montres pour femme répondent à toutes les fantaisies et s\'adaptent à chacun de leurs styles, au gré de leurs humeurs ou de leurs envies, du quotidien et des grands soirs',
    Male: 'Accessoires de mode à part entière, les montres pour homme ont largement dépassé leur fonction première. Elles ne donnent plus seulement l\'heure. Désormais, elles incarnent subtilement un bout de nous-mêmes. Elles reflètent nos goûts, nos envies, nos attitudes et laissent entrevoir un brin de notre personnalité. Elles deviennent même des marqueurs sociaux, à travers lesquels nous projetons nos aspirations.',
}

export default categories;

// Translation function
function displayTitle(cat){
        switch (cat) {
            case 'Child':
                return 'Enfant'
            case 'Female':
                return 'Femme'
            case 'Male': 
            return 'Homme'
            default:
                break;
        }
}

// Display appropriate text function
function displayText(cat){
    switch (cat) {
            case 'Child':
                return categoriesText.Child
            case 'Female':
                return categoriesText.Female
            case 'Male': 
                return categoriesText.Male
            default:
                break;
        }
}

export const categoriesService = {
    categories,
    displayTitle,
    displayText
}