-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "url_original" TEXT NOT NULL,
    "url_shortened" TEXT NOT NULL,
    "userId" INTEGER,
    "clickCounter" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_shortened_key" ON "urls"("url_shortened");

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
