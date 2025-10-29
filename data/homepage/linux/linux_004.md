# 第4章：文件与目录操作

## 概述

在Linux系统中，一切皆文件。文件和目录操作是Linux系统管理中最基本、最频繁的操作之一。掌握文件和目录的创建、复制、移动、删除等操作，以及如何高效地查找和管理文件，是Linux系统使用的基础技能。

本章将详细介绍Linux中文件和目录的基本操作命令，包括文件浏览、创建、复制、移动、删除、查找等，并介绍文件权限的基本概念和操作方法。

## 1 文件系统目录结构

### 1.1 Linux文件系统层次结构

Linux文件系统采用树形结构，根目录为"/"，所有文件和目录都挂载在根目录下。根据FHS（Filesystem Hierarchy Standard）标准，Linux系统的主要目录及其用途如下：

```
/      - 根目录，所有文件的起点
/bin   - 基本命令二进制文件
/boot  - 系统启动相关文件
/dev   - 设备文件
/etc   - 系统配置文件
/home  - 用户主目录
/lib   - 系统库文件
/media - 可移动媒体挂载点
/mnt   - 临时文件系统挂载点
/opt   - 可选软件包
/proc  - 进程信息文件系统
/root  - root用户主目录
/run   - 运行时数据
/sbin  - 系统管理命令
/srv   - 服务数据
/sys   - 系统信息
/tmp   - 临时文件
/usr   - 用户程序
/var   - 变量数据文件
```

### 1.2 当前工作目录与路径

在Linux中，每个操作都在一个特定的目录下进行，这个目录称为"当前工作目录"。

- **绝对路径**：从根目录"/"开始的完整路径
- **相对路径**：相对于当前工作目录的路径

特殊目录符号：
- `.` - 当前目录
- `..` - 上级目录
- `~` - 当前用户的主目录
- `-` - 上一次的工作目录

```bash
# 显示当前工作目录
pwd

# 切换到指定目录
cd /path/to/directory

# 切换到上级目录
cd ..

# 切换到用户主目录
cd ~
# 或者
cd

# 切换到上一次的工作目录
cd -
```

## 2 文件与目录的基本操作

### 2.1 列出目录内容

`ls`命令用于列出目录内容：

```bash
# 基本用法
ls

# 列出详细信息
ls -l

# 列出所有文件（包括隐藏文件）
ls -a

# 列出所有文件的详细信息
ls -la

# 以人类可读格式显示文件大小
ls -lh

# 按时间排序显示
ls -lt

# 按大小排序显示
ls -lS

# 递归显示目录内容
ls -R

# 组合使用
ls -lahR
```

`ls -l`输出说明：
```
-rw-r--r-- 1 user group 1024 Jan 1 12:00 filename
```
- 第1个字符：文件类型（-普通文件，d目录，l链接文件等）
- 第2-9个字符：文件权限（r读，w写，x执行）
- 第10个字符：文件数量（对于目录表示子目录数量）
- 第11个字符：所有者
- 第12个字符：所属组
- 第13个字符：文件大小
- 第14-15个字符：最后修改时间
- 第16个字符：文件名

### 2.2 创建目录

`mkdir`命令用于创建目录：

```bash
# 创建单个目录
mkdir dirname

# 创建多级目录
mkdir -p dir1/dir2/dir3

# 创建多个目录
mkdir dir1 dir2 dir3

# 创建目录并设置权限
mkdir -m 755 dirname
```

### 2.3 创建文件

在Linux中，有多种方式可以创建文件：

```bash
# 使用touch命令创建空文件
touch filename

# 使用touch命令创建多个文件
touch file1 file2 file3

# 使用重定向创建空文件
> filename

# 使用echo命令创建文件并写入内容
echo "Hello World" > filename

# 使用cat命令创建文件并写入多行内容
cat > filename << EOF
Line 1
Line 2
Line 3
EOF
```

### 2.4 复制文件和目录

`cp`命令用于复制文件和目录：

```bash
# 复制文件
cp source_file destination_file

# 复制文件到目录
cp source_file destination_directory/

# 复制多个文件到目录
cp file1 file2 file3 destination_directory/

# 复制目录（需要-r选项）
cp -r source_directory destination_directory

# 复制时保留文件属性
cp -a source_file destination_file

# 复制时显示详细信息
cp -v source_file destination_file

# 复制时覆盖前询问
cp -i source_file destination_file

# 复制时只更新较新的文件
cp -u source_file destination_file
```

### 2.5 移动和重命名文件和目录

`mv`命令用于移动和重命名文件和目录：

```bash
# 重命名文件
mv old_name new_name

# 移动文件到目录
mv file destination_directory/

# 移动多个文件到目录
mv file1 file2 file3 destination_directory/

# 移动目录
mv source_directory destination_directory/

# 移动前询问
mv -i source destination

# 显示移动过程
mv -v source destination
```

### 2.6 删除文件和目录

`rm`命令用于删除文件和目录：

```bash
# 删除文件
rm filename

# 删除多个文件
rm file1 file2 file3

# 删除前询问
rm -i filename

# 强制删除（不询问）
rm -f filename

# 删除目录及其内容
rm -r directory

# 删除目录及其内容（不询问）
rm -rf directory

# 显示删除过程
rm -v filename
```

**警告**：`rm -rf`命令非常危险，会强制删除指定目录及其所有内容，无法恢复。使用前请务必确认路径正确。

## 3 文件内容查看

### 3.1 查看文件内容

```bash
# 显示整个文件内容
cat filename

# 显示文件内容并显示行号
cat -n filename

# 显示文件内容（适合大文件）
more filename

# 显示文件内容（适合大文件，支持向上翻页）
less filename

# 查看文件前几行（默认10行）
head filename

# 查看文件前n行
head -n 20 filename

# 查看文件后几行（默认10行）
tail filename

# 查看文件后n行
tail -n 20 filename

# 实时查看文件内容（常用于日志文件）
tail -f filename
```

### 3.2 文件内容搜索

```bash
# 在文件中搜索文本
grep "pattern" filename

# 搜索时忽略大小写
grep -i "pattern" filename

# 显示行号
grep -n "pattern" filename

# 递归搜索目录中的文件
grep -r "pattern" directory/

# 显示不匹配的行
grep -v "pattern" filename

# 只显示匹配的文件名
grep -l "pattern" file1 file2 file3

# 使用正则表达式搜索
grep -E "pattern" filename
```

## 4 文件查找

### 4.1 find命令

`find`命令是Linux中功能强大的文件查找工具：

```bash
# 按名称查找文件
find /path -name "filename"

# 按名称查找文件（不区分大小写）
find /path -iname "filename"

# 查找特定类型的文件
find /path -type f    # 普通文件
find /path -type d    # 目录
find /path -type l    # 符号链接

# 按大小查找文件
find /path -size +100M    # 大于100MB的文件
find /path -size -10M     # 小于10MB的文件
find /path -size 50M      # 等于50MB的文件

# 按修改时间查找文件
find /path -mtime -7      # 7天内修改过的文件
find /path -mtime +30     # 30天前修改过的文件

# 按权限查找文件
find /path -perm 644

# 查找后执行命令
find /path -name "*.txt" -exec rm {} \;
find /path -name "*.log" -exec cat {} \;

# 组合条件查找
find /path -name "*.txt" -size +1M -mtime -7
```

### 4.2 locate命令

`locate`命令通过预建的数据库快速查找文件：

```bash
# 查找文件
locate filename

# 更新文件数据库
sudo updatedb

# 限制结果数量
locate -n 10 filename

# 使用正则表达式
locate -r "pattern"
```

### 4.3 which和whereis命令

```bash
# 查找命令的路径
which command

# 查找命令的二进制文件、源代码和手册页
whereis command
```

## 5 文件链接

### 5.1 硬链接

硬链接是文件的另一个名字，指向同一个inode（索引节点）：

```bash
# 创建硬链接
ln source_file link_name

# 查看文件的inode号
ls -i filename
```

硬链接的特点：
- 硬链接与原文件共享相同的inode
- 删除原文件，硬链接仍然有效
- 不能跨文件系统创建硬链接
- 不能为目录创建硬链接

### 5.2 软链接（符号链接）

软链接是一个特殊的文件，包含指向另一个文件的路径：

```bash
# 创建软链接
ln -s source_file link_name

# 创建目录的软链接
ln -s /path/to/directory link_name

# 查看链接信息
ls -l link_name
```

软链接的特点：
- 软链接有自己的inode
- 删除原文件，软链接失效
- 可以跨文件系统创建软链接
- 可以为目录创建软链接

## 6 文件权限管理

### 6.1 文件权限基本概念

Linux文件权限分为三组：
- 所有者（User）权限
- 所属组（Group）权限
- 其他人（Others）权限

每类权限包括：
- 读（r，数值4）
- 写（w，数值2）
- 执行（x，数值1）

权限表示方法：
- 符号表示法：rwxr-xr--
- 八进制表示法：755

### 6.2 查看文件权限

```bash
# 查看文件权限
ls -l filename

# 查看目录权限
ls -ld directory/

# 以数字形式查看权限
stat filename
```

### 6.3 修改文件权限

使用`chmod`命令修改文件权限：

```bash
# 符号模式修改权限
chmod u+x filename      # 给所有者添加执行权限
chmod g-w filename      # 移除所属组的写权限
chmod o=r filename      # 设置其他人的权限为只读
chmod a+r filename      # 给所有人添加读权限

# 八进制模式修改权限
chmod 755 filename      # rwxr-xr-x
chmod 644 filename      # rw-r--r--
chmod 777 filename      # rwxrwxrwx

# 递归修改目录权限
chmod -R 755 directory/

# 参考其他文件权限
chmod --reference=reference_file target_file
```

### 6.4 修改文件所有者和所属组

使用`chown`和`chgrp`命令修改文件所有者和所属组：

```bash
# 修改文件所有者
sudo chown new_owner filename

# 修改文件所属组
sudo chgrp new_group filename

# 同时修改所有者和所属组
sudo chown new_owner:new_group filename

# 递归修改目录所有者和所属组
sudo chown -R new_owner:new_group directory/

# 参考其他文件的所有者和所属组
sudo chown --reference=reference_file target_file
```

## 7 文件压缩与归档

### 7.1 tar命令

`tar`命令用于创建和解压归档文件：

```bash
# 创建归档文件
tar -cvf archive.tar file1 file2 directory/

# 创建gzip压缩的归档文件
tar -czvf archive.tar.gz file1 file2 directory/

# 创建bzip2压缩的归档文件
tar -cjvf archive.tar.bz2 file1 file2 directory/

# 解压归档文件
tar -xvf archive.tar

# 解压gzip压缩的归档文件
tar -xzvf archive.tar.gz

# 解压bzip2压缩的归档文件
tar -xjvf archive.tar.bz2

# 查看归档文件内容
tar -tvf archive.tar

# 解压到指定目录
tar -xvf archive.tar -C /path/to/directory/
```

### 7.2 zip和unzip命令

```bash
# 创建zip压缩文件
zip archive.zip file1 file2 directory/

# 递归压缩目录
zip -r archive.zip directory/

# 解压zip文件
unzip archive.zip

# 解压到指定目录
unzip archive.zip -d /path/to/directory/

# 查看zip文件内容
unzip -l archive.zip
```

### 7.3 gzip和gunzip命令

```bash
# 压缩文件
gzip filename

# 解压文件
gunzip filename.gz

# 压缩时保留原文件
gzip -k filename

# 解压时保留原文件
gunzip -k filename.gz

# 查看压缩文件内容
zcat filename.gz
```

## 8 实用技巧与最佳实践

### 8.1 文件操作实用技巧

1. **使用通配符进行批量操作**
   ```bash
   # 删除所有.log文件
   rm *.log
   
   # 复制所有.jpg文件到图片目录
   cp *.jpg ~/Pictures/
   
   # 查找所有以test开头的文件
   ls test*
   ```

2. **使用大括号扩展**
   ```bash
   # 创建多个文件
   touch file{1..5}.txt
   
   # 复制文件并重命名
   cp file.txt{,.bak}
   ```

3. **使用xargs处理文件列表**
   ```bash
   # 查找并删除所有.tmp文件
   find . -name "*.tmp" | xargs rm
   
   # 批量修改文件权限
   find . -name "*.sh" | xargs chmod +x
   ```

4. **使用管道组合命令**
   ```bash
   # 查找大文件并排序
   find . -type f -exec du -h {} \; | sort -rh | head -n 10
   
   # 统计目录中文件数量
   ls -1 | wc -l
   ```

### 8.2 文件安全最佳实践

1. **定期备份重要文件**
   ```bash
   # 创建备份脚本
   #!/bin/bash
   tar -czvf backup_$(date +%Y%m%d).tar.gz /path/to/important/files
   ```

2. **谨慎使用rm命令**
   ```bash
   # 创建rm别名，增加安全确认
   alias rm='rm -i'
   
   # 或者使用trash命令代替rm
   alias rm='trash'
   ```

3. **合理设置文件权限**
   ```bash
   # 设置目录权限为755
   find . -type d -exec chmod 755 {} \;
   
   # 设置文件权限为644
   find . -type f -exec chmod 644 {} \;
   ```

4. **监控敏感文件变化**
   ```bash
   # 使用inotify-tools监控文件变化
   inotifywait -m /path/to/important/file
   ```

## 9 实践练习

### 9.1 基础练习

1. 在用户主目录下创建以下目录结构：
   ```
   ~/projects/
   ├── web/
   │   ├── css/
   │   ├── js/
   │   └── images/
   └── scripts/
   ```

2. 在~/projects/web/css/目录下创建3个CSS文件，在js/目录下创建3个JavaScript文件。

3. 将所有CSS文件复制到~/backup/css/目录，所有JavaScript文件复制到~/backup/js/目录。

4. 将~/projects/目录打包成projects.tar.gz文件。

5. 查找系统中所有大于10MB的.log文件。

### 9.2 进阶练习

1. 编写一个脚本，自动备份指定目录，并删除7天前的备份文件。

2. 查找系统中所有权限为777的文件，并将其权限修改为755。

3. 统计当前目录及子目录中所有文件的总大小。

4. 找出系统中最近24小时内修改过的所有配置文件（.conf）。

5. 创建一个符号链接，指向系统中最新的日志文件。

## 10 常见问题与解决方案

### 10.1 文件操作常见问题

1. **"Permission denied"错误**
   - 问题：没有足够的权限执行操作
   - 解决：使用sudo获取管理员权限，或修改文件/目录权限

2. **"No such file or directory"错误**
   - 问题：文件或目录不存在
   - 解决：检查路径是否正确，使用ls命令确认文件存在

3. **"File exists"错误**
   - 问题：目标文件已存在
   - 解决：使用-i选项覆盖前询问，或使用-f选项强制覆盖

4. **"Directory not empty"错误**
   - 问题：尝试删除非空目录
   - 解决：使用rm -r命令递归删除

### 10.2 性能优化技巧

1. **使用find命令的优化选项**
   ```bash
   # 限制搜索深度
   find . -maxdepth 2 -name "*.log"
   
   # 先查找再执行，减少I/O
   find . -name "*.tmp" -print0 | xargs -0 rm
   ```

2. **使用rsync代替cp进行大文件复制**
   ```bash
   # 支持断点续传的复制
   rsync -av --progress source_file destination_file
   ```

3. **使用parallel命令并行处理**
   ```bash
   # 并行压缩多个文件
   ls *.log | parallel gzip {}
   ```

## 11 本章小结

本章详细介绍了Linux系统中文件和目录的基本操作，包括：

1. Linux文件系统的层次结构和路径概念
2. 文件和目录的创建、复制、移动、删除等基本操作
3. 文件内容的查看和搜索方法
4. 文件查找的多种方式和技巧
5. 文件链接的概念和使用
6. 文件权限的管理和修改
7. 文件压缩与归档的方法
8. 文件操作的实用技巧和最佳实践

掌握这些基本操作是使用Linux系统的基础，也是后续学习系统管理、Shell编程等高级内容的前提。通过实践练习，读者可以熟练掌握Linux文件系统的操作技巧，提高工作效率。

下一章将介绍Linux中的文本内容处理工具，包括sed、awk等强大的文本处理命令，进一步扩展Linux命令行的使用能力。