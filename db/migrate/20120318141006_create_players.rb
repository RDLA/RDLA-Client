class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.references :user
      t.string :name

      t.timestamps
    end
    add_index :players, :user_id
  end
end
