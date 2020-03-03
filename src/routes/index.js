import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Order from '../pages/Order';
import AddOrder from '../pages/AddOrder';
import Deliveryman from '../pages/Deliveryman';
import AddDeliverymen from '../pages/AddDeliveryman';
import EditDeliverymen from '../pages/EditDeliveryman';
import Recipient from '../pages/Recipient';
import AddRecipient from '../pages/AddRecipient';
import Problem from '../pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route exact path="/orders" component={Order} isPrivate />
      <Route path="/register/orders" component={AddOrder} isPrivate />
      <Route exact path="/deliverymen" component={Deliveryman} isPrivate />
      <Route
        path="/register/deliverymen"
        component={AddDeliverymen}
        isPrivate
      />
      <Route path="/deliverymen/:id" component={EditDeliverymen} isPrivate />
      <Route exact path="/recipients" component={Recipient} isPrivate />
      <Route path="/register/recipients" component={AddRecipient} isPrivate />
      <Route exact path="/deliveryproblems" component={Problem} isPrivate />
    </Switch>
  );
}
