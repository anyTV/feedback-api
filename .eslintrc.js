module.exports = {
    "extends": "standard",
    "rules":{
        'node/no-deprecated-api': 1,
        'prefer-promise-reject-errors': 1,
        'eqeqeq': 1,
        'new-cap': 1,
        'no-proto': 1,
        'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1}],
        'lines-between-class-members': ['error', 'always'],
        'padding-line-between-statements': [
            'error',
            { 'blankLine': 'always', 'prev': '*', 'next': 'function' },
            { 'blankLine': 'always', 'prev': 'block-like', 'next': '*' }
        ],
        'camelcase': 0
    }
};