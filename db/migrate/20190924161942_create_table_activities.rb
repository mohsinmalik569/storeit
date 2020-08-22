class CreateTableActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.integer :activity_type, default: 0
      t.text :offer_title
      t.text :short_description
      t.text :long_description
      t.integer :search_type, default: 0
      t.text :highlight_title
      t.string :language
      t.integer :minimum_participents, default: 0
      t.integer :maximum_participants, default: 0
      t.integer :min_age
      t.integer :max_age
      t.string :currency
      t.decimal :adult_price, default: 0
      t.decimal :kids_price, default: 0
      t.boolean :kids_free
      t.decimal :baby_price, default: 0
      t.boolean :baby_free
      t.timestamps
    end

    create_table :activity_attachments do |t|
      t.references :activity
      t.string :image
      t.timestamps
    end

    create_table :tags do |t|
      t.references :activity
      t.string :tag_name
      t.timestamps
    end

    create_table :include_details do |t|
      t.references :activity
      t.text :detail_title
      t.timestamps
    end

    create_table :exclude_details do |t|
      t.references :activity
      t.text :detail_title
      t.timestamps
    end

    create_table :activity_days do |t|
      t.references :activity
      t.datetime :activity_date
      t.datetime :start_time
      t.datetime :end_time
      t.timestamps
    end
  end
end
