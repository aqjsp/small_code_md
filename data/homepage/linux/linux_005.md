# 第5章：文本内容处理

## 概述

在Linux系统中，文本处理是一项非常重要的技能。无论是系统管理、日志分析、配置文件编辑，还是数据处理，都离不开高效的文本处理工具。Linux提供了丰富而强大的文本处理命令，如grep、sed、awk、sort、uniq等，这些工具可以通过管道组合使用，实现复杂的文本处理任务。

本章将详细介绍Linux中常用的文本处理工具，包括文本搜索、文本编辑、文本排序、文本统计等功能，并通过实际案例展示如何组合使用这些工具解决实际问题。

## 1 文本查看工具

### 1.1 cat命令

`cat`（concatenate）命令用于连接文件并打印到标准输出：

```bash
# 显示文件内容
cat filename

# 显示多个文件内容
cat file1 file2 file3

# 显示文件内容并显示行号
cat -n filename

# 显示文件内容，但对空行不编号
cat -b filename

# 显示文件内容，并在每行末尾显示$符号
cat -E filename

# 显示文件内容，并将制表符显示为^I
cat -T filename

# 将多个文件合并为一个文件
cat file1 file2 > newfile

# 创建文件并写入内容
cat > newfile.txt << EOF
Line 1
Line 2
Line 3
EOF
```

### 1.2 more和less命令

`more`和`less`命令用于分页显示文件内容：

```bash
# 使用more命令分页显示文件
more filename

# 使用less命令分页显示文件（功能更强）
less filename

# less命令中的常用操作：
# 空格键：向下翻页
# b键：向上翻页
# q键：退出
# /pattern：向下搜索
# ?pattern：向上搜索
# n：重复上一次搜索
# N：反向重复上一次搜索
# g：跳转到文件开头
# G：跳转到文件末尾
# :n：跳转到第n行
```

### 1.3 head和tail命令

`head`和`tail`命令用于显示文件的开头和结尾部分：

```bash
# 显示文件前10行（默认）
head filename

# 显示文件前n行
head -n 20 filename

# 显示文件后10行（默认）
tail filename

# 显示文件后n行
tail -n 20 filename

# 实时监控文件内容（常用于日志文件）
tail -f filename

# 实时监控文件内容，并显示文件名
tail -F filename

# 从第n行开始显示文件内容
tail -n +50 filename

# 同时显示文件的头和尾
head -n 5 filename; echo "---"; tail -n 5 filename
```

## 2 文本搜索工具

### 2.1 grep命令

`grep`（Global Regular Expression Print）命令用于搜索文本并匹配指定模式：

```bash
# 基本搜索
grep "pattern" filename

# 在多个文件中搜索
grep "pattern" file1 file2 file3

# 递归搜索目录中的文件
grep -r "pattern" directory/

# 忽略大小写搜索
grep -i "pattern" filename

# 显示行号
grep -n "pattern" filename

# 只显示匹配的文件名
grep -l "pattern" file1 file2 file3

# 只显示不匹配的行
grep -v "pattern" filename

# 统计匹配的行数
grep -c "pattern" filename

# 显示匹配行及其上下文（前后各2行）
grep -C 2 "pattern" filename

# 显示匹配行及其后2行
grep -A 2 "pattern" filename

# 显示匹配行及其前2行
grep -B 2 "pattern" filename

# 使用扩展正则表达式
grep -E "pattern" filename

# 只匹配整个单词
grep -w "pattern" filename

# 使用Perl兼容正则表达式
grep -P "pattern" filename

# 排除特定文件类型
grep -r "pattern" --exclude="*.log" directory/

# 只在特定文件类型中搜索
grep -r "pattern" --include="*.conf" directory/
```

### 2.2 正则表达式基础

正则表达式是一种强大的文本模式匹配工具：

```bash
# 基本字符匹配
grep "hello" filename        # 匹配包含"hello"的行

# 行首匹配
grep "^hello" filename       # 匹配以"hello"开头的行

# 行尾匹配
grep "hello$" filename       # 匹配以"hello"结尾的行

# 字符类匹配
grep "h[ae]llo" filename     # 匹配"hallo"或"hello"
grep "h[0-9]llo" filename    # 匹配"h0llo"到"h9llo"
grep "h[^a-z]llo" filename   # 匹配"h"后跟非小写字母，然后"llo"

# 重复匹配
grep "hel*o" filename        # 匹配"he"后跟0个或多个"l"，然后"o"
grep "hel+o" filename        # 匹配"he"后跟1个或多个"l"，然后"o"（需要-E选项）
grep "hel?o" filename        # 匹配"helo"或"hello"（需要-E选项）

# 精确次数匹配
grep "hel\{2\}o" filename    # 匹配"hello"（两个l）
grep "hel\{2,4\}o" filename  # 匹配2到4个l（需要-E选项）

# 分组匹配
grep "\(hello\)\+" filename  # 匹配一个或多个"hello"
grep "\(hello\|world\)" filename  # 匹配"hello"或"world"（需要-E选项）

# 特殊字符转义
grep "hello\.world" filename # 匹配"hello.world"
grep "hello\\world" filename # 匹配"hello\world"
```

## 3 文本编辑工具

### 3.1 sed命令

`sed`（Stream Editor）命令是一个流编辑器，用于对文本进行过滤和转换：

```bash
# 基本语法
sed [选项] '命令' 文件

# 显示文件内容（不修改原文件）
sed 'p' filename

# 删除第2行
sed '2d' filename

# 删除第2到第5行
sed '2,5d' filename

# 删除最后一行
sed '$d' filename

# 删除空行
sed '/^$/d' filename

# 删除包含特定模式的行
sed '/pattern/d' filename

# 替换文本（只替换每行第一个匹配）
sed 's/old/new/' filename

# 替换文本（替换所有匹配）
sed 's/old/new/g' filename

# 替换文本（替换第2个匹配）
sed 's/old/new/2' filename

# 替换文本（替换从第2个开始的所有匹配）
sed 's/old/new/2g' filename

# 替换文本（忽略大小写）
sed 's/old/new/gi' filename

# 在每行前添加文本
sed 's/^/prefix/' filename

# 在每行后添加文本
sed 's/$/suffix/' filename

# 只对包含特定模式的行进行替换
sed '/pattern/s/old/new/g' filename

# 只对指定行进行替换
sed '2s/old/new/g' filename
sed '2,5s/old/new/g' filename

# 使用扩展正则表达式
sed -E 's/(hello|world)/new/g' filename

# 多个编辑命令
sed 's/old1/new1/g; s/old2/new2/g' filename

# 从文件读取编辑命令
sed -f script.sed filename

# 直接修改文件
sed -i 's/old/new/g' filename

# 直接修改文件并备份
sed -i.bak 's/old/new/g' filename

# 使用不同的分隔符
sed 's#/path/old#/path/new#g' filename
```

### 3.2 sed高级应用

```bash
# 在指定行后插入新行
sed '2a\new line' filename

# 在指定行前插入新行
sed '2i\new line' filename

# 替换整行
sed '2c\new line' filename

# 打印指定行
sed -n '2p' filename

# 打印包含特定模式的行
sed -n '/pattern/p' filename

# 转换大小写
sed 's/.*/\U&/' filename    # 转换为大写
sed 's/.*/\L&/' filename    # 转换为小写
sed 's/\b\w/\u&/g' filename # 首字母大写

# 删除行首空格
sed 's/^[ \t]*//' filename

# 删除行尾空格
sed 's/[ \t]*$//' filename

# 删除HTML标签
sed 's/<[^>]*>//g' filename

# 提取IP地址
sed -n 's/.*\([0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\).*/\1/p' filename
```

## 4 文本处理工具

### 4.1 sort命令

`sort`命令用于对文本行进行排序：

```bash
# 基本排序（按字母顺序）
sort filename

# 逆序排序
sort -r filename

# 忽略大小写排序
sort -f filename

# 按数字排序
sort -n filename

# 按月份排序
sort -M filename

# 按人类可读的数字排序（如1K、2M等）
sort -h filename

# 随机排序
sort -R filename

# 检查文件是否已排序
sort -c filename

# 去重后排序
sort -u filename

# 指定字段分隔符
sort -t: filename

# 按指定字段排序
sort -k2 filename

# 按多个字段排序
sort -k2,2 -k3,3n filename

# 组合使用
sort -t: -k3n -k2r filename

# 稳定排序（保持相同键值的原始顺序）
sort -s filename

# 将排序结果写入文件
sort -o sorted_file filename
```

### 4.2 uniq命令

`uniq`命令用于报告或省略重复的行：

```bash
# 去除重复行（需要先排序）
sort filename | uniq

# 显示重复行
sort filename | uniq -d

# 显示不重复行
sort filename | uniq -u

# 统计重复次数
sort filename | uniq -c

# 只显示重复一次的行
sort filename | uniq -D

# 比较字段（跳过前2个字符）
sort filename | uniq -s 2

# 比较字段（只比较前3个字符）
sort filename | uniq -w 3

# 忽略大小写
sort filename | uniq -i

# 全局比较（不跳过任何字段）
sort filename | uniq -f 0
```

### 4.3 cut命令

`cut`命令用于从文件中提取列：

```bash
# 按字符提取（提取每行的第3-5个字符）
cut -c 3-5 filename

# 按字节提取
cut -b 3-5 filename

# 按字段提取（使用制表符作为分隔符）
cut -f 2 filename

# 指定字段分隔符
cut -d: -f 1,3 filename

# 提取多个字段
cut -d: -f 1-3,5 filename

# 提取除指定字段外的所有字段
cut -d: --complement -f 2 filename

# 只输出包含分隔符的行
cut -d: -f 1 --output-delimiter=' ' filename
```

### 4.4 paste命令

`paste`命令用于合并文件的行：

```bash
# 合并两个文件（默认用制表符分隔）
paste file1 file2

# 使用指定分隔符合并文件
paste -d: file1 file2

# 串行合并文件（一个文件的所有行先输出，再输出另一个文件）
paste -s file1 file2

# 合并多个文件
paste file1 file2 file3

# 合并文件并使用自定义分隔符
paste -d '+' file1 file2
```

### 4.5 tr命令

`tr`命令用于转换或删除字符：

```bash
# 字符替换（将a替换为b）
echo "aabbcc" | tr a b

# 字符集替换（将小写字母转换为大写字母）
echo "hello world" | tr a-z A-Z

# 删除字符
echo "hello world" | tr -d ' '

# 删除重复字符
echo "aabbcc" | tr -s a

# 字符集补集替换（将不在a-z范围内的字符替换为换行符）
echo "hello123world" | tr -c a-z '\n'

# 使用字符类
echo "Hello World" | tr '[:lower:]' '[:upper:]'
echo "Hello World" | tr '[:upper:]' '[:lower:]'
echo "Hello World 123" | tr -d '[:digit:]'
echo "Hello World" | tr -d '[:space:]'
```

## 5 高级文本处理工具

### 5.1 awk命令

`awk`是一种强大的文本处理工具，特别适合处理结构化文本：

```bash
# 基本语法
awk [选项] '模式 {动作}' 文件

# 打印整行
awk '{print}' filename
awk '{print $0}' filename

# 打印指定字段（默认以空格或制表符分隔）
awk '{print $1}' filename

# 打印多个字段
awk '{print $1, $3}' filename

# 指定字段分隔符
awk -F: '{print $1, $3}' filename

# 使用正则表达式作为模式
awk '/pattern/ {print}' filename
awk '/pattern/ {print $2}' filename

# 使用关系表达式作为模式
awk '$3 > 100 {print}' filename
awk '$1 == "error" {print}' filename

# 使用BEGIN和END块
awk 'BEGIN {print "Start processing"} {print} END {print "End processing"}' filename

# 计算总和
awk '{sum += $3} END {print "Total:", sum}' filename

# 计算平均值
awk '{sum += $3; count++} END {print "Average:", sum/count}' filename

# 条件语句
awk '{if ($3 > 100) print $1, "High"; else print $1, "Normal"}' filename

# 循环语句
awk '{for (i=1; i<=NF; i++) print $i}' filename

# 内置函数
awk '{print length($0), $0}' filename
awk '{print toupper($1)}' filename
awk '{print substr($0, 1, 5)}' filename

# 自定义变量
awk -v var="hello" '{print var, $1}' filename

# 多个文件处理
awk '{print FILENAME, $0}' file1 file2

# NR和FNR变量
awk '{print NR, $0}' filename           # 当前记录号（跨文件）
awk '{print FNR, $0}' filename          # 当前记录号（当前文件）
awk 'NR==FNR {print "File1:", $0} NR!=FNR {print "File2:", $0}' file1 file2

# NF变量
awk '{print NF, $0}' filename           # 字段数量
awk '{print $NF}' filename              # 最后一个字段

# 复杂示例：统计每个用户使用的磁盘空间
du -s /home/* | awk '{print $2, $1}' | sort -k2 -nr
```

### 5.2 join命令

`join`命令用于基于共同字段合并两个文件：

```bash
# 基本合并（基于第一个字段）
join file1 file2

# 指定字段
join -1 2 -2 1 file1 file2    # file1的第2字段与file2的第1字段匹配

# 忽略大小写
join -i file1 file2

# 只显示配对的行
join -a 1 file1 file2         # 显示file1中未配对的行
join -a 2 file1 file2         # 显示file2中未配对的行
join -a 1 -a 2 file1 file2    # 显示所有未配对的行

# 指定输出字段
join -o 1.1,2.2 file1 file2   # 输出file1的第1字段和file2的第2字段

# 使用不同的分隔符
join -t: file1 file2

# 不排序输入文件（文件必须已排序）
join --nocheck-order file1 file2
```

## 6 文本格式化工具

### 6.1 fmt命令

`fmt`命令用于格式化文本段落：

```bash
# 基本格式化（默认每行75个字符）
fmt filename

# 指定每行宽度
fmt -w 50 filename

# 统一缩进
fmt -u filename

# 保留原有缩进
fmt -p '    ' filename

# 处理多个文件
fmt file1 file2 > formatted_files
```

### 6.2 fold命令

`fold`命令用于折叠长行：

```bash
# 基本折叠（默认每行80个字符）
fold filename

# 指定每行宽度
fold -w 50 filename

# 按字节折叠
fold -b -w 50 filename

# 按空格折叠（不在单词中间断开）
fold -s -w 50 filename
```

### 6.3 pr命令

`pr`命令用于将文本文件转换为打印格式：

```bash
# 基本格式化（默认每页66行）
pr filename

# 指定每页行数
pr -l 50 filename

# 指定每列
pr -3 filename

# 添加页眉
pr -h "My Document" filename

# 添加页码
pr -n filename

# 双面打印格式
pr -T filename

# 指定页面宽度
pr -w 80 filename
```

## 7 字符编码转换

### 7.1 iconv命令

`iconv`命令用于转换字符编码：

```bash
# 查看支持的编码
iconv -l

# 转换编码（从UTF-8到GBK）
iconv -f UTF-8 -t GBK input.txt > output.txt

# 转换编码并忽略错误
iconv -f UTF-8 -t GBK -c input.txt > output.txt

# 转换编码并输出到原文件
iconv -f UTF-8 -t GBK input.txt -o input.txt
```

### 7.2 dos2unix和unix2dos命令

```bash
# 将Windows格式转换为Unix格式
dos2unix filename

# 将Unix格式转换为Windows格式
unix2dos filename

# 批量转换
dos2unix *.txt
```

## 8 实用文本处理案例

### 8.1 日志分析

```bash
# 统计Apache访问日志中IP访问次数
awk '{print $1}' access.log | sort | uniq -c | sort -nr

# 找出访问次数最多的前10个IP
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 10

# 统计HTTP状态码出现次数
awk '{print $9}' access.log | sort | uniq -c | sort -nr

# 找出访问量最大的时间段
awk '{print $4}' access.log | cut -d: -f2 | sort | uniq -c | sort -nr

# 查找错误日志
grep "ERROR" application.log | tail -n 20

# 实时监控日志文件
tail -f application.log | grep "ERROR"
```

### 8.2 配置文件处理

```bash
# 提取配置文件中的键值对
grep -v "^#" config.conf | grep -v "^$" | cut -d= -f1,2

# 修改配置文件中的值
sed 's/^old_value=/new_value=/' config.conf > config.conf.new

# 批量修改配置文件
find . -name "*.conf" -exec sed -i 's/old_value/new_value/g' {} \;

# 提取配置文件中的注释
grep "^#" config.conf

# 检查配置文件语法
nginx -t
```

### 8.3 数据处理

```bash
# CSV文件处理
cut -d, -f1,3 data.csv | sort | uniq

# 计算CSV文件中数值列的总和
awk -F, '{sum += $3} END {print "Total:", sum}' data.csv

# 过滤CSV文件中的数据
awk -F, '$3 > 100 {print}' data.csv

# 合并多个CSV文件
awk 'FNR==1 && NR!=1 {next} {print}' file1.csv file2.csv file3.csv > combined.csv

# 转换CSV为TSV
cat data.csv | tr ',' '\t' > data.tsv
```

### 8.4 代码处理

```bash
# 统计代码行数
find . -name "*.py" | xargs wc -l

# 统计注释行数
grep -r "^#" --include="*.py" . | wc -l

# 查找未使用的变量
grep -r "var_name" --include="*.py" . | wc -l

# 批量替换代码中的函数名
find . -name "*.py" -exec sed -i 's/old_function/new_function/g' {} \;

# 提取Python文件中的函数定义
grep -n "^def " *.py
```

## 9 文本处理最佳实践

### 9.1 性能优化

1. **使用适当的工具**
   - 对于简单搜索，使用`grep`而不是`awk`
   - 对于排序操作，使用`sort`而不是`awk`
   - 对于列提取，使用`cut`而不是`awk`

2. **减少管道操作**
   ```bash
   # 不好的做法
   cat file | grep "pattern" | wc -l
   
   # 好的做法
   grep -c "pattern" file
   ```

3. **使用内置变量和函数**
   ```bash
   # 不好的做法
   awk '{print $1, $2, $3, $4, $5}' file
   
   # 好的做法
   awk '{print}' file
   ```

### 9.2 可读性维护

1. **使用有意义的变量名**
   ```bash
   # 不好的做法
   awk '{a=$1; b=$2; print a, b}' file
   
   # 好的做法
   awk '{name=$1; age=$2; print name, age}' file
   ```

2. **添加注释**
   ```bash
   # 统计每个用户的登录次数
   awk '{users[$1]++} END {for (user in users) print user, users[user]}' access.log
   ```

3. **使用适当的格式化**
   ```bash
   # 格式化输出
   awk '{printf "%-10s %5d\n", $1, $2}' file
   ```

## 10 实践练习

### 10.1 基础练习

1. 创建一个包含学生信息的文本文件（学号、姓名、成绩），并完成以下任务：
   - 按成绩排序
   - 统计平均分
   - 找出成绩最高的学生
   - 筛选出成绩大于80分的学生

2. 分析系统日志文件：
   - 统计错误消息数量
   - 提取特定时间段内的日志
   - 找出最常见的错误类型

3. 处理CSV文件：
   - 提取特定列
   - 计算数值列的总和和平均值
   - 过滤特定条件的数据

### 10.2 进阶练习

1. 编写一个脚本，分析Web服务器访问日志：
   - 统计每个IP的访问次数
   - 找出访问最频繁的页面
   - 计算平均响应时间
   - 生成访问量时间分布图

2. 处理配置文件：
   - 提取所有配置项
   - 验证配置文件格式
   - 批量修改配置值
   - 合并多个配置文件

3. 文本数据转换：
   - 将JSON格式转换为CSV格式
   - 将固定宽度文件转换为分隔符文件
   - 标准化日期格式
   - 清理和规范化文本数据

## 11 常见问题与解决方案

### 11.1 文本处理常见问题

1. **编码问题**
   - 问题：文件包含非ASCII字符导致处理错误
   - 解决：使用`iconv`转换编码或设置适当的语言环境

2. **大文件处理**
   - 问题：处理大文件时内存不足
   - 解决：使用流式处理工具如`sed`、`awk`，避免一次性加载整个文件

3. **特殊字符处理**
   - 问题：文件名或内容包含空格、引号等特殊字符
   - 解决：使用适当的引号和转义字符

4. **性能问题**
   - 问题：复杂文本处理操作执行缓慢
   - 解决：优化命令组合，减少不必要的管道操作

### 11.2 调试技巧

1. **分步调试**
   ```bash
   # 逐步检查每个命令的输出
   command1 | tee step1.txt | command2 | tee step2.txt | command3
   ```

2. **使用详细模式**
   ```bash
   # 使用详细选项查看命令执行过程
   grep -v "pattern" file
   sed -n 'p' file
   awk '{print NR, $0}' file
   ```

3. **测试正则表达式**
   ```bash
   # 先测试正则表达式是否正确
   echo "test string" | grep -o "pattern"
   ```

## 12 本章小结

本章详细介绍了Linux中常用的文本处理工具，包括：

1. 文本查看工具：cat、more、less、head、tail
2. 文本搜索工具：grep及正则表达式
3. 文本编辑工具：sed及其高级应用
4. 文本处理工具：sort、uniq、cut、paste、tr
5. 高级文本处理工具：awk及其强大功能
6. 文本格式化工具：fmt、fold、pr
7. 字符编码转换：iconv、dos2unix、unix2dos
8. 实用文本处理案例和最佳实践

掌握这些文本处理工具，可以高效地处理各种文本数据，是Linux系统管理和开发工作中的重要技能。通过组合使用这些工具，可以构建强大的文本处理管道，解决复杂的数据处理问题。

下一章将介绍Linux中的用户与权限管理，包括用户账户管理、组管理、权限控制等内容，这是Linux系统安全和管理的基础。