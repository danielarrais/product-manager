class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.integer :category, null: false
      t.decimal :price, null: false, scale: 2, precision: 15
      t.integer :rating
      t.integer :width
      t.integer :height
      t.string :filename

      t.timestamps
    end
  end
end
