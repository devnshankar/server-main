-- CreateTable
CREATE TABLE "users_table" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "token" TEXT,
    "phone_number" TEXT,
    "address" TEXT,
    "profile_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "instock" INTEGER NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "owner_id" TEXT NOT NULL,
    "product_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews_table" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "reviews_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments_table" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_table" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items_table" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_table" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "orders_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_table_email_key" ON "users_table"("email");

-- AddForeignKey
ALTER TABLE "products_table" ADD CONSTRAINT "products_table_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_table" ADD CONSTRAINT "products_table_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_table" ADD CONSTRAINT "comments_table_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_table" ADD CONSTRAINT "comments_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications_table" ADD CONSTRAINT "notifications_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items_table" ADD CONSTRAINT "order_items_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items_table" ADD CONSTRAINT "order_items_table_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items_table" ADD CONSTRAINT "order_items_table_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_table" ADD CONSTRAINT "orders_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
