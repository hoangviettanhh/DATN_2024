import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminPostCategoryComponent } from './admin-post-category/admin-post-category.component';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminProductCategoryComponent } from './admin-product-category/admin-product-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminVoucherComponent } from './admin-voucher/admin-voucher.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductAddComponent } from './admin-product-category/admin-product-add/admin-product-add.component';

const adminRoutes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'postCategory', component: AdminPostCategoryComponent },
    { path: 'post', component: AdminPostComponent },
    { path: 'productCategory', component: AdminProductCategoryComponent },
    { path: 'productCategory/add', component: AdminProductAddComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'user', component: AdminUserComponent },
    { path: 'login', component: AdminLoginComponent },
    { path: 'register', component: AdminRegisterComponent },
    { path: 'voucher', component: AdminVoucherComponent },
    { path: 'order', component: AdminOrderComponent },

    
    // Thêm các route admin khác ở đây
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
