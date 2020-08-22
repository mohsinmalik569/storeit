class ActivitiesController < ApplicationController
  def index
  end

  def new
    @activity = Activity.new
    render :new, myparams: params[:activity].present? ? params[:activity] : ""
  end

  def create
    @activity = Activity.new(activity_params)
    @activity.activity_type = params[:step1Value]&.to_i
    @activity.offer_title = params[:step2_offerTitle]
    @activity.short_description = params[:step2_shortDes]
    @activity.long_description = params[:step2_longDes]
    @activity.search_type = params[:step2_radioInput]
    if params[:step2_tags].present?
      params[:step2_tags]&.split(',').each do |tag_name|
        @activity.tags.new(tag_name: tag_name)
      end
    end
    if @activity.save!
      flash[:notice] = "Activity Saved"
    else
      flash[:notice] = "Activity failed to save"
    end
    redirect_to activities_path
  end

  def step1
  end

  def step2
  end

  def step3

  end

  def step4

  end

  private
    def activity_params
      params.require(:activity).permit(:minimum_participents, :maximum_participants, :min_age, :max_age, :language, :baby_price, :kids_price, :adult_price,:activity_type, :offer_title, :short_description, :search_type, :highlight_title, :long_description, :language, tags_attributes: [:id, :tag_name], activity_attachments_attributes: [:id, :image => []], include_details_attributes: [:id, :detail_title], exclude_details_attributes: [:id, :detail_title])
    end
end
