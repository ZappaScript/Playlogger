






def exp(init,rate,upperBound):
    n = 1
    result = 0
    while result <= upperBound:
        result += pow(rate,n)*init
        n+=1
        print(result, n)
    print(result)