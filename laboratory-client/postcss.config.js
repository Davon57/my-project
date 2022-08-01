module.exports = {
  plugins: [
    [
      'postcss-px2rem-exclude',
      {
        remUnit: 37.5,
        exclude: /node_modules|folder_name/i
      },
      'postcss-px2rem'
    ]
  ]
}
