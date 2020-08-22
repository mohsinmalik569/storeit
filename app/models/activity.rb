class Activity < ApplicationRecord
  has_many :tags
  accepts_nested_attributes_for :tags
  has_many_attached :activity_attachments
  has_many :include_details
  accepts_nested_attributes_for :include_details
  has_many :exclude_details
  accepts_nested_attributes_for :exclude_details

  has_many :activity_days
  accepts_nested_attributes_for :activity_days

  enum search_type: [:public_activity, :private_activity]
  enum activity_type: [:tour, :workshop, :travel_partner, :hotel_package]
end
