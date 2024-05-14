/* eslint-disable */
export type Schema = {
  'Blog': {
    plain: {
      'id': string;
      'title': string;
      'description': string;
    };
    nested: {};
    flat: {};
  };
  'CreateCustomer': {
    plain: {
      'id': string;
      'userId': string;
      'customer_info': any;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'customers': {
    plain: {
      'id': number;
      'customer_response': any;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'flight_data': {
    plain: {
      'id': string;
      'origin_name': string;
      'destination_name': string;
      'origin_iata': string;
      'destination_iata': string;
    };
    nested: {};
    flat: {};
  };
  'payment_intent': {
    plain: {
      'id': number;
      'userId': string;
      'intent_response': any;
      'intentStatus': string;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'PaymentLinks': {
    plain: {
      'id': string;
      'userId': string;
      'link_response': any;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'refresh_tokens': {
    plain: {
      'id': string;
      'user_id': string;
      'refresh_token': string;
      'refresh_token_expires': string;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'travel_bookings': {
    plain: {
      'id': string;
      'userId': string;
      'booking_response': any;
      'Status': string;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'users': {
    plain: {
      'id': string;
      'first_name': string;
      'last_name': string;
      'email': string;
      'password': string;
      'token': string;
      'isActive': number;
      'isVerified': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
};
