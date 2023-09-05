import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router';
import request from './plugin/request'
import { 
  Button, 
  Select, 
  Form, 
  FormItem, 
  Input, 
  Header, 
  Aside, 
  Main, 
  Container ,
  Table,
  TableColumn,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Pagination,
  PageHeader,
  Loading,
  Empty,
  MessageBox,
  Message,
  Dialog,
  Option,
  Divider,
  Badge,
  Tag

} from 'element-ui';


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Loading.directive)  // v-loading
Vue.use(request)

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Col.name, Col);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Pagination.name, Pagination);
Vue.component(PageHeader.name, PageHeader);
Vue.component(Empty.name, Empty);
Vue.component(Dialog.name, Dialog);
Vue.component(Option.name, Option);
Vue.component(Divider.name, Divider);
Vue.component(Badge.name, Badge);
Vue.component(Tag.name, Tag);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
